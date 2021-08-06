import supertest from "supertest";
import { getConnection } from "typeorm";

import app, { init } from "../../src/app";
import { createUser } from "../factories/userFactory";
import { clearDatabase } from "../utils/database";

beforeAll(async () => {
  await init();
});

beforeEach(async () => {
  await clearDatabase();
});

afterAll(async () => {
  await getConnection().close();
});

describe("POST /sign-up", () => {
  const validBody = {
    email: "test@test.com",
    password: "123456",
    confirmPassword: "123456",
  };

  it("should answer with status 400 for a invalid email", async () => {
    const invalidEmailBody = { ...validBody, email: "test.com" };
    const response = await supertest(app)
      .post("/sign-up")
      .send(invalidEmailBody);

    expect(response.statusCode).toEqual(400);
  });

  it("should answer with status 400 for a invalid password confirm", async () => {
    const invalidConfirmPasswordBody = {
      ...validBody,
      confirmPassword: "1234567",
    };
    const response = await supertest(app)
      .post("/sign-up")
      .send(invalidConfirmPasswordBody);

    expect(response.statusCode).toEqual(400);
  });

  it("should answer with status 409 for a valid body but conflicted email", async () => {
    await createUser();

    const response = await supertest(app).post("/sign-up").send(validBody);

    expect(response.statusCode).toEqual(409);
  });

  it("should answer with status 201 for a valid body with not used email", async () => {
    const response = await supertest(app).post("/sign-up").send(validBody);

    expect(response.statusCode).toEqual(201);
  });
});
