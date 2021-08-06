import { getRepository } from "typeorm";
import bcrypt from "bcrypt";
import generateToken from "./utils/generateToken";
import User from "../entities/User";

export async function signUp(email: string, password: string) {
  const userRepository = getRepository(User);

  const user = await userRepository.findOne({ where: { email } });

  if (user !== undefined) return false;

  const hashedPassword = bcrypt.hashSync(password, 12);
  await userRepository.insert({ email, password: hashedPassword });

  return true;
}

export async function signIn(email: string, password: string) {
  const userRepository = getRepository(User);

  const user = await userRepository.findOne({ where: { email } });

  if (user === undefined) return null;

  const hashedPassword = bcrypt.compareSync(password, user.password);

  if (!hashedPassword) return null;

  const token = generateToken(user.id);

  return token;
}
