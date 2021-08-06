import { Request, Response } from "express";
import userSchema from "../schemas/userSchema";

import * as userService from "../services/userService";

export async function signUp (req: Request, res: Response) {
  try {
    const validation = userSchema.signUp.validate(req.body)
    if(validation.error) return res.sendStatus(400);

    interface SignUp {
      email:string,
      password:string
    }
    
    const {email, password} = req.body as SignUp;
    const signUpSuccess = await userService.signUp(email, password);

    if(!signUpSuccess){
      return res.sendStatus(409)
    }

    res.sendStatus(201);
  }catch (err) {
    console.error(err);
    res.sendStatus(500);
  }
}
