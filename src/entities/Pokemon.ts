import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import PokemonUser from "./PokemonUser";

@Entity("pokemons")
export default class Pokemon {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  number: number;

  @Column()
  image: string;

  @Column()
  weight: number;

  @Column()
  height: number;

  @Column()
  baseExp: number;

  @Column()
  description: string;

  @Column("boolean", { default: false })
  inMyPokemons: boolean;

  @OneToMany(() => PokemonUser, (pokemonUser) => pokemonUser.pokemon)
  pokemonUsers: PokemonUser[];
}
