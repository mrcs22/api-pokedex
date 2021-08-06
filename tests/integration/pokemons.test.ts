import supertest from "supertest";
import { getConnection } from "typeorm";
import jwt from "jsonwebtoken";
import app, { init } from "../../src/app";
import { createUser } from "../factories/userFactory";
import { clearDatabase } from "../utils/database";
import { createPokemon } from "../factories/pokemonFactory";
import createPokemonUser from "../factories/PokemonUserFacory";
import Pokemon from "../../src/entities/Pokemon";
beforeAll(async () => {
  await init();
});

beforeEach(async () => {
  await clearDatabase();
});

afterAll(async () => {
  await getConnection().close();
});

describe("GET /pokemons", () => {
  it("returns status 401 for no token", async () => {
    const response = await supertest(app).get("/pokemons");
    expect(response.statusCode).toEqual(401);
  });

  it("returns status 401 for invalid token", async () => {
    const response = await supertest(app)
      .get("/pokemons")
      .set({
        Headers: {
          Authorization: jwt.sign({ userId: 0 }, process.env.JWT_SECRET),
        },
      });

    expect(response.statusCode).toEqual(401);
  });

  it("returns status 200 for valid token", async () => {
    const userId = await createUser("someone@test.com");

    const response = await supertest(app)
      .get("/pokemons")
      .set(
        "Authorization",
        `Bearer ${jwt.sign({ userId }, process.env.JWT_SECRET)}`
      );

    expect(response.statusCode).toEqual(200);
  });

  it("returns correct pokemons for valid token", async () => {
    const myUserId = await createUser("someone@test.com");
    const someoneUserId = await createUser("someone@test.com");
    const myPokemonId = await createPokemon();
    const someonePokemonId = await createPokemon();

    await createPokemonUser(myUserId, myPokemonId);
    await createPokemonUser(someoneUserId, someonePokemonId);

    const response = await supertest(app)
      .get("/pokemons")
      .set(
        "Authorization",
        `Bearer ${jwt.sign({ userId: myUserId }, process.env.JWT_SECRET)}`
      );

    const receivedPokemons = response.body;
    const countOfAllReceivedPokemons = receivedPokemons.length;
    const countOfMyPokemons = receivedPokemons.filter(
      (p: Pokemon) => p.inMyPokemons
    ).length;

    expect(countOfAllReceivedPokemons).toEqual(2);
    expect(countOfMyPokemons).toEqual(1);
  });
});
