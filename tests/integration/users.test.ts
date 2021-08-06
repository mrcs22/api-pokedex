import supertest from "supertest";
import { getConnection } from "typeorm";
import jwt from "jsonwebtoken";
import app, { init } from "../../src/app";
import { createUser } from "../factories/userFactory";
import { clearDatabase } from "../utils/database";

const baseUserRequestBody = {
  email: "test@test.com",
  password: "123456",
};

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
  const validBody = { ...baseUserRequestBody, confirmPassword: "123456" };

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

describe("POST /sign-in", () => {
  it("returns status 400 for invalid email", async () => {
    const invalidEmailBody = { ...baseUserRequestBody, email: "test.com" };

    const response = await supertest(app)
      .post("/sign-in")
      .send(invalidEmailBody);

    expect(response.statusCode).toEqual(400);
  });

  it("returns status 401 for valid but nonexistent email", async () => {
    const nonexistentEmailBody = {
      ...baseUserRequestBody,
      email: "test@testing.com",
    };

    const response = await supertest(app)
      .post("/sign-in")
      .send(nonexistentEmailBody);

    expect(response.statusCode).toEqual(401);
  });

  it("returns status 401 for existent email but wrong password", async () => {
    await createUser();

    const wrongPasswordBody = {
      ...baseUserRequestBody,
      password: "1234567",
    };

    const response = await supertest(app)
      .post("/sign-in")
      .send(wrongPasswordBody);

    expect(response.statusCode).toEqual(401);
  });

  it("returns status 200 for correct email and password", async () => {
    await createUser();

    const validBody = {
      ...baseUserRequestBody,
    };

    const response = await supertest(app).post("/sign-in").send(validBody);

    expect(response.statusCode).toEqual(200);
  });

  it("returns a correct token for valid email and password", async () => {
    const insertedUserId = await createUser();

    const validBody = {
      ...baseUserRequestBody,
    };

    const response = await supertest(app).post("/sign-in").send(validBody);
    const token = response.body.token;

    const tokenData = JSON.stringify(jwt.verify(token, process.env.JWT_SECRET));
    const tokenUserId = JSON.parse(tokenData).userId;

    expect(tokenUserId).toEqual(insertedUserId);
  });
});
