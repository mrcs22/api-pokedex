import { Request, Response } from "express";
import * as pokemonsService from "../services/pokemonsService";

export async function listAll(req: Request, res: Response) {
  try {
    const userId = res.locals.autenticatedUserId;

    const pokemons = await pokemonsService.getAll(userId);

    res.send(pokemons);
  } catch (err) {
    console.error(err);
    res.sendStatus(500);
  }
}

export async function addToMyPokemons(req: Request, res: Response) {
  try {
    const userId = res.locals.autenticatedUserId;
    const pokemonId = parseInt(req.params.id);

    const successAtAddingPokemon = await pokemonsService.updateMyPokemons(
      userId,
      pokemonId,
      "add"
    );

    if (!successAtAddingPokemon) return res.sendStatus(400);

    res.sendStatus(200);
  } catch (err) {
    console.error(err);
    res.sendStatus(500);
  }
}

export async function removeFromMyPokemons(req: Request, res: Response) {
  try {
    const userId = res.locals.autenticatedUserId;
    const pokemonId = parseInt(req.params.id);

    const successAtRemovingPokemon = await pokemonsService.updateMyPokemons(
      userId,
      pokemonId,
      "remove"
    );

    if (!successAtRemovingPokemon) return res.sendStatus(400);

    res.sendStatus(200);
  } catch (err) {
    console.error(err);
    res.sendStatus(500);
  }
}
