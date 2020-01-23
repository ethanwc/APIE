import { Request, Response, Router } from "express";
import { BAD_REQUEST, CREATED, OK, NOT_FOUND } from "http-status-codes";
import { UserModel } from "../models/UserModel";
// Router
const router = Router();
// User Model
// const User = UserModel;

//Handle Login
router.post("/login", async (req: Request, res: Response) =>
  res.status(OK).json("test")
);

//Handle Register
router.post("/register", async (req: Request, res: Response) =>
  res.status(CREATED).json("test")
);


export default router;