import { Request, Response, Router } from "express";
import {
  BAD_REQUEST,
  CREATED,
  OK,
  NOT_FOUND,
  GATEWAY_TIMEOUT
} from "http-status-codes";
import { DeviceModel } from "../models/DeviceModel";
var db = require("../database");
const axios = require("axios");

// Router
const router = Router();

//Get all devices a user owns
router.get("/", async (req: Request, res: Response) => {
  if (req && req.body) {
    const username = req.body.user;
    db.query(
      `SELECT * FROM Device d INNER JOIN Customer c ON d.ownerid = (SELECT c.id FROM Customer c WHERE c.username = '${username}');`,
      async (err, result) => {
        if (result) {
          res.status(OK).send(result.rows[0]);
        } else res.status(GATEWAY_TIMEOUT).send();
      }
    );
  } else res.status(GATEWAY_TIMEOUT).send();
});

//Edit a user's device
//TODO: send req to sub device here...implement when both servers are running....
router.post("/", async (req: Request, res: Response) => {
  if (req && req.body) {
    const username = req.body.user;
    const deviceData: DeviceModel = req.body;

    db.query(
      `SELECT * FROM Device d INNER JOIN Customer c ON d.ownerid = (SELECT c.id FROM Customer c WHERE c.username = '${username}');`,
      async (err, result) => {
        if (result) {
          const address = result.rows[0].address;
          axios
            .post(address, {
              color: { r: 1, g: 5, b: 10 }
            })
            .then(res => {
              console.log(res);
              res.status(OK).send();
            })
            .catch(error => {
              console.error(error);
            });

          res.status(OK).send(result.rows);
        } else res.status(GATEWAY_TIMEOUT).send();
      }
    );

    db.query(
      `UPDATE Device SET devicestate = '${JSON.stringify(
        deviceData.devicestate
      )}' WHERE id = ${deviceData.id};`,
      async (err, result) => {
        if (result) {
          res.status(OK).send(result.rows);
        } else res.status(GATEWAY_TIMEOUT).send();
      }
    );
  } else res.status(GATEWAY_TIMEOUT).send();
});

export default router;
