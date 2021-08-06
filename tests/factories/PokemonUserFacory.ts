import { getRepository } from "typeorm";
import PokemonUser from "../../src/entities/PokemonUser";

export default async function createPokemonUser(
  userId: number,
  pokemonId: number
): Promise<number> {
  const { id } = (
    await getRepository(PokemonUser).insert({ userId, pokemonId })
  ).generatedMaps[0];

  return id;
}
