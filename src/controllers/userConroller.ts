import { Request, Response } from "express";
import userSchema from "../schemas/userSchema";

import * as userService from "../services/userService";

export async function signUp(req: Request, res: Response) {
  try {
    const validation = userSchema.signUp.validate(req.body);
    if (validation.error) return res.sendStatus(400);

    interface SignUp {
      email: string;
      password: string;
    }

    const { email, password } = req.body as SignUp;
    const signUpSuccess = await userService.signUp(email, password);

    if (!signUpSuccess) {
      return res.sendStatus(409);
    }

    res.sendStatus(201);
  } catch (err) {
    console.error(err);
    res.sendStatus(500);
  }
}

export async function signIn(req: Request, res: Response) {
  try {
    const validation = userSchema.signIn.validate(req.body);
    if (validation.error) return res.sendStatus(400);

    interface SignIn {
      email: string;
      password: string;
    }

    const { email, password } = req.body as SignIn;
    const token = await userService.signIn(email, password);

    if (!token) {
      return res.sendStatus(401);
    }

    res.send({ token });
  } catch (err) {
    console.error(err);
    res.sendStatus(500);
  }
}
