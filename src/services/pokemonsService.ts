import { getRepository } from "typeorm";
import Pokemon from "../entities/Pokemon";
import PokemonUser from "../entities/PokemonUser";

export async function getAll(userId: number) {
  const allPokemons = await getRepository(Pokemon).find();
  const myPokemons = await getRepository(PokemonUser).find({
    where: { userId },
  });

  const myPokemonsHash: { [key: string]: boolean } = {};

  myPokemons.forEach((p) => {
    myPokemonsHash[p.pokemonId] = true;
  });

  const allPokemonsWithUserOnesSinged = allPokemons.map((p) => {
    if (myPokemonsHash[p.id]) {
      p.inMyPokemons = true;
    }
    return p;
  });

  return allPokemonsWithUserOnesSinged;
}
