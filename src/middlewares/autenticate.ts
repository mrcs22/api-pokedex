import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { getRepository } from "typeorm";
import User from "../entities/User";

export default async function autenticate(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const token = req.header("authorization")?.replace("Bearer ", "");

  if (!token) return res.sendStatus(401);
  let tokenData = "{}";

  try {
    tokenData = JSON.stringify(jwt.verify(token, process.env.JWT_SECRET));
  } catch (e) {
    return res.sendStatus(401);
  }

  const userId = JSON.parse(tokenData).userId;

  const user = await getRepository(User).findOne({ where: { id: userId } });

  if (!user) return res.sendStatus(401);

  res.locals.autenticatedUserId = userId;

  next();
}
