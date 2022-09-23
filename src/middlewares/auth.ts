import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";

import {
  ADMIN_USERNAME,
  ADMIN_PASSWORD,
  JWT_SECRET_KEY,
} from "../config/config";

interface IGetUserAuthInfoRequest extends Request {
  user: any;
}

const DAY_IN_SECONDS = "86400s";

export function generateAccessToken(claims: any) {
  return jwt.sign(claims, JWT_SECRET_KEY, { expiresIn: DAY_IN_SECONDS });
}

export function authenticateToken(
  req: IGetUserAuthInfoRequest,
  res: Response,
  next: NextFunction
) {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (token == null) {
    return res.sendStatus(401);
  }

  jwt.verify(token, JWT_SECRET_KEY, (err, user) => {
    if (err) {
      return res.sendStatus(403);
    }

    req.user = user;
    next();
  });
}

export function isRootAdminUser(login: string, password: string) {
  return login === ADMIN_USERNAME && password === ADMIN_PASSWORD;
}
