import { Request, Response, Router } from "express";
import { BAD_REQUEST, CREATED, OK, NOT_FOUND } from "http-status-codes";
import { UserModel } from "../models/UserModel";
// Router
const router = Router();
// User Model
// const User = UserModel;

router.get("/", async (req: Request, res: Response) =>
  res.status(OK).json("test")
);


router.post("/", async (req: Request, res: Response) =>
  res.status(CREATED).json("test")
);



export default router;