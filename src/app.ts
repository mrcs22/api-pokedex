import "./setup";
import express from "express";
import cors from "cors";
import "reflect-metadata";

import connectDatabase from "./database";

import * as userController from "./controllers/userConroller";
import * as pokemonsController from "./controllers/pokemonsConroller";
import autenticate from "./middlewares/autenticate";

const app = express();
app.use(cors());
app.use(express.json());

app.post("/sign-up", userController.signUp);

app.post("/sign-in", userController.signIn);

app.get("/pokemons", autenticate, pokemonsController.listAll);

app.post(
  "/my-pokemons/:id/add",
  autenticate,
  pokemonsController.addToMyPokemons
);

export async function init() {
  await connectDatabase();
}

export default app;
