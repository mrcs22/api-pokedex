import { getRepository } from "typeorm";

import User from "../../src/entities/User";

export async function createUser(): Promise<number> {
  const user = {
    email: "test@test.com",
    password: "123456",
  };

  const { id } = (await getRepository(User).insert(user)).generatedMaps[0];

  return id;
}
