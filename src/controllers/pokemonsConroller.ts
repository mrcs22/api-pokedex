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
