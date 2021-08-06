import { getRepository } from "typeorm";
import bcrypt from "bcrypt";

import User from "../entities/User";



export async function signUp (email:string, password:string) {
  const userRepository = getRepository(User);

  const user = await userRepository.findOne({where:{email}});

  if(user !== undefined) return false
  
  const hashedPassword = bcrypt.hashSync(password, 12);
  await userRepository.insert({email, password: hashedPassword});
  
  return true;
}
