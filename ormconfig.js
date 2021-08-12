require("dotenv").config();

module.exports = {
  type: "postgres",
  url: process.env.DATABASE_URL,
  migrationsTableName: "migrations",
  entities: ["dist/src/entities/*.js"],
  migrations: ["dist/src/migrations/*.js"],
  extra: {
    ssl: {
      rejectUnauthorized: false,
    },
  },
  cli: {
    migrationsDir: "src/migrations",
    entitiesDir: "dist/src/entities/*.js",
  },
};
