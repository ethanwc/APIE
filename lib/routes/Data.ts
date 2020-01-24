import { Request, Response, Router } from "express";
import {
  BAD_REQUEST,
  CREATED,
  OK,
  NOT_FOUND,
  GATEWAY_TIMEOUT
} from "http-status-codes";
var db = require("../database");

// Router
const router = Router();

//Return all data of a device
router.get("/", async (req: Request, res: Response) => {
  if (req && req.body) {
    const username = req.body.user;
    const deviceid = req.body.deviceid;
    db.query(
      `SELECT recordtime, info FROM Log WHERE deviceid = ${deviceid};`,
      async (err, result) => {
        if (result) {
          res.status(OK).send(result.rows);
        } else res.status(GATEWAY_TIMEOUT).send();
      }
    );
  } else res.status(GATEWAY_TIMEOUT).send();
});

//Add most recent data to a device
router.post("/", async (req: Request, res: Response) => {
  if (req && req.body) {
    const deviceid = req.body.deviceid;
    const info = JSON.stringify(req.body.devicedata);

    db.query(
      `INSERT INTO Log(deviceid, recordtime, info) Values('${deviceid}', NOW(), '${info}')`,
      async (err, result) => {
        if (result) {
          res.status(CREATED).send();
        } else res.status(GATEWAY_TIMEOUT).send();
      }
    );
  } else res.status(GATEWAY_TIMEOUT).send();
});

export default router;
