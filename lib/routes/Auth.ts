import { Request, Response, Router, response } from "express";
import {
  BAD_REQUEST,
  CREATED,
  OK,
  NOT_FOUND,
  CONFLICT,
  GATEWAY_TIMEOUT,
  UNAUTHORIZED
} from "http-status-codes";
import { LoginModel, RegisterModel } from "../models/AuthModel";
import * as jwt from "jsonwebtoken";
var db = require("../database");
var bcrypt = require("bcryptjs");
require("dotenv").config();

// Router
const router = Router();

//Create a JWT token from a user's username
const createToken = (user: String): String => {
  const secret = process.env.JWT || "";
  const token: string = jwt.sign({ user: user }, secret, {
    expiresIn: "60m"
  });
  return token;
};

//Handle Login
router.post("/login", async (req: Request, res: Response) => {
  if (req && req.body) {
    const userData: LoginModel = req.body;
    //Check if user exists
    db.query(
      `SELECT * FROM Customer c WHERE c.username = '${userData.username}'`,
      async (err, result) => {
        if (result) {
          //Check passwords match
          const verified = await bcrypt.compare(
            userData.password,
            result.rows[0].password
          );
          if (verified) {
            //Update JWT and return it
            const jwttoken = createToken(userData.username);
            db.query(
              `UPDATE Customer 
               SET jwttoken = '${jwttoken}' 
               WHERE username = '${userData.username}';`,
              (err, result) => {
                if (result) res.status(OK).send({ jwttoken: jwttoken });
                else res.status(GATEWAY_TIMEOUT).send();
              }
            );
          } else res.status(UNAUTHORIZED).send();
        } else res.status(GATEWAY_TIMEOUT).send();
      }
    );
  }
});
//Handle Register
router.post("/register", async (req: Request, res: Response) => {
  if (req && req.body) {
    const userData: RegisterModel = req.body;
    //Check if username already exists
    db.query(
      `SELECT * FROM Customer c WHERE c.username = '${userData.username}'`,
      (err, result) => {
        //Username already exists
        if (result) {
          if (result.rows.length > 0) {
            res.status(CONFLICT).send();
          }
          //Username does not exist, okay to continue.
          else {
            //Check passwords match
            if (userData.password1 !== userData.password2) {
              res.status(BAD_REQUEST).send();
            }
            //Passwords don't match, return error
            else {
              //INSERT user into db...with JWT
              const jwttoken = createToken(userData.username);
              //encrypt password
              let passwordhash = bcrypt.hashSync(userData.password1);
              //combine fname and lname
              const fullname = userData.fname + " " + userData.lname;

              // Store hash password in DB
              db.query(
                `INSERT INTO CUSTOMER(name, username, password, jwttoken) VALUES('${fullname}', '${userData.username}', '${passwordhash}', '${jwttoken}');`,
                (err, result) => {
                  if (result) {
                    //User created, return JWT
                    console.log("User ", userData.username, " created");
                    res.status(CREATED).send({ jwttoken: jwttoken });
                  } else {
                    //User failed to create, return error
                    console.log(err);
                    res.status(GATEWAY_TIMEOUT).send();
                  }
                }
              );
            }
          }
        }
      }
    );
  }
});

export default router;
