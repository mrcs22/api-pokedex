import { getRepository } from "typeorm";
import bcrypt from "bcrypt";
import User from "../../src/entities/User";

export async function createUser(): Promise<number> {
  const user = {
    email: "test@test.com",
    password: bcrypt.hashSync("123456", 12),
  };

  const { id } = (await getRepository(User).insert(user)).generatedMaps[0];

  return id;
}
