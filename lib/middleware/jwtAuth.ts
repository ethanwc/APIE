import * as jwt from "jsonwebtoken";
import { NextFunction, Request, Response } from "express";
import { BAD_REQUEST, UNAUTHORIZED } from "http-status-codes";

interface RequestWithUser extends Request {
  user: object | string;
}

/**
 *
 * @param {RequestWithUser} req
 * @param {Response} res
 * @param {NextFunction} next
 * @returns {void}
 * @swagger
 *  components:
 *   securitySchemes:
 *     ApiKeyAuth:
 *       type: apiKey
 *       in: header
 *       name: x-access-token
 */
export function isAuthenticated(
  req: RequestWithUser,
  res: Response,
  next: NextFunction
): void {
  const token: any = req.body.jwttoken;

  if (token) {
    try {
      const jwttoken: any = jwt.verify(token, process.env.JWT);

      req.body.user = jwttoken.user;

      return next();
    } catch (error) {
      return next(res.status(UNAUTHORIZED).send());
    }
  }

  return next(res.status(BAD_REQUEST).send());
}
