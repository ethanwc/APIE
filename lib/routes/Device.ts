import { Request, Response, Router } from "express";
import { BAD_REQUEST, CREATED, OK, NOT_FOUND } from "http-status-codes";
import { DeviceModel } from "../models/DeviceModel";

// Router
const router = Router();

router.get("/", async (req: Request, res: Response) => {
  res.status(OK).json(req.body);
});

export default router;
