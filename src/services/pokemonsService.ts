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

export async function updateMyPokemons(
  userId: number,
  pokemonId: number,
  action: string
) {
  const pokemon = await getRepository(Pokemon).findOne({
    where: { id: pokemonId },
  });

  if (!pokemon) return false;

  if (action === "add") {
    await getRepository(PokemonUser).insert({ userId, pokemonId });
    return true;
  }

  if (action === "remove") {
    const myPokemonRegister = await getRepository(PokemonUser).findOne({
      where: { userId, pokemonId },
    });

    if (!myPokemonRegister) return false;

    await getRepository(PokemonUser).delete({ userId, pokemonId });

    return true;
  }
}
