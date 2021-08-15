<h1 align="center">API-Pokedex</h1>

## 📕 Summary

- [📋 About](#about)
- [📝 Features](#features)
- [🕹 technologies ](#tecnologias)
- [🧑🏽‍💻 How to run](#how-to-run)

<hr>

<!-- About -->

# About

<p align="left">This is an API where you can list, add and remove Pokémons from your list. This application is the gear behind our Pokédex that you can access by clicking <a href="https://pokedex-mrcs22.vercel.app/"> here. </a></p>

<!-- Features -->

# Features

- [x] Sign Up
- [x] Login
- [x] List all pokémons
- [x] Add Pokémon to your pokémons
- [x] Remove Pokémon from your pokémons
- [x] List your pokémons

<!-- technologies -->

# Technologies

- [Node JS](https://nodejs.org/en/)
- [Express](https://expressjs.com/pt-br/)
- [TypeScript](https://www.typescriptlang.org/)
- [PostgreSQL](https://www.postgresql.org/)

<hr>

<!-- how to run -->

# How to run

##### requirements

- Node JS

  ```sh
  https://nodejs.org/en/
  ```

- Yarn or Npm

  ```sh
  https://yarnpkg.com/
  ```

- PostgreSQL

  ```sh
  https://www.postgresql.org/
  ```

<hr>

```bash
# clone this repo by running
$ git clone https://github.com/mrcs22/api-pokedex
# or use the download option.

#change to project directory
$ cd api-pokedex

# install the dependencies
$ yarn or npm install

# Define a database and populate the .env file

# Create the tables using the command
$ yarn typeorm migration:run or npm typeorm migration:run

# Populate pokémons table by running
$ yarn or npm run populateDatabase

# Run the application using the command
$ yarn dev ou npm run dev
```

---
