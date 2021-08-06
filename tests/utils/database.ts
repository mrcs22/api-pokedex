import { getRepository } from "typeorm";
import Pokemon from "../../src/entities/Pokemon";
import PokemonUser from "../../src/entities/PokemonUser";

import User from "../../src/entities/User";

export async function clearDatabase() {
  await getRepository(PokemonUser).delete({});
  await getRepository(Pokemon).delete({});
  await getRepository(User).delete({});
}
