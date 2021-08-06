import { init } from "../src/app";
import { getRepository } from "typeorm";
import Pokemon from "../src/entities/Pokemon";
import axios from "axios";

async function populateDatabase() {
  await init();

  const pokemonsAmount = 10;
  for (let i = 1; i <= pokemonsAmount; i++) {
    const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${i}`);

    const { id, name, order, sprites, weight, height, base_experience, types } =
      response.data;

    const newPokemon = {
      id,
      name,
      number: order,
      image: sprites.front_default,
      weight,
      height,
      baseExp: base_experience,
      description: types[0].type.name,
    };

    await getRepository(Pokemon).insert(newPokemon);

    printProgress(i, pokemonsAmount);
  }
}

function printProgress(current: number, target: number) {
  console.clear();
  console.log(
    `populating database\n ${Math.ceil((current * 100) / target)}% completed...`
  );
}

populateDatabase();
