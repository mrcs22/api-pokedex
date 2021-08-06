import { getRepository } from "typeorm";
import Pokemon from "../../src/entities/Pokemon";

export async function createPokemon(): Promise<number> {
  const newPokemon = {
    name: "test",
    number: 9999,
    image: "https://",
    weight: 9999,
    height: 9999,
    baseExp: 9999,
    description: "A beautiful test pokemon",
  };

  const { id } = (await getRepository(Pokemon).insert(newPokemon))
    .generatedMaps[0];

  return id;
}
