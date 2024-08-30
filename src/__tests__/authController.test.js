const request = require("supertest");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const mongoose = require("mongoose");
const app = require("../index");
const User = require("../models/User");

jest.mock("bcryptjs");
jest.mock("jsonwebtoken");
jest.mock("../models/User");
jest.mock("../config/firebase");

describe("Auth Controller", () => {
  beforeEach(() => {
    jest.clearAllMocks(); 
  });

  describe("Signup", () => {
    it("should return 400 if required fields are missing", async () => {
      const res = await request(app)
        .post("/api/signup")
        .send({
          firstName: "akshay",
          email: "akshay@gmail.com",
          password: "Akshay@123",
        });

      expect(res.status).toBe(400);
      expect(res.body.error).toBe(
        "All fields (first name, last name, email, password) are required"
      );
    });

    it("should return 400 if user already exists", async () => {
      User.findOne.mockResolvedValueOnce({ email: "akshay@gmail.com" });

      const res = await request(app)
        .post("/api/signup")
        .send({
          firstName: "akshay",
          lastName: "saxena",
          email: "akshay@gmail.com",
          password: "Akshay@123",
        });

      expect(res.status).toBe(400);
      expect(res.body.error).toBe("User with same email already exists");
    });

    it("should return 201 and create a new user if data is valid", async () => {
      User.findOne.mockResolvedValueOnce(null);
      bcrypt.hash.mockResolvedValueOnce("hashedpassword");
      const savedUser = {
        _id: new mongoose.Types.ObjectId().toHexString(),
        firstName: "akshay",
        lastName: "saxena",
        email: "akshay@gmail.com",
        password: "hashedpassword",
      };
      User.prototype.save.mockResolvedValueOnce(savedUser);
      jwt.sign.mockReturnValueOnce("token");

      const res = await request(app)
        .post("/api/signup")
        .send({
          firstName: "akshay",
          lastName: "saxena",
          email: "akshay@gmail.com",
          password: "Akshay@123",
        });

      expect(res.status).toBe(201);
      expect(res.body.token).toBe("token");
    });

    it("should return 500 if there is a server error", async () => {
      User.findOne.mockRejectedValueOnce(new Error("Server Error"));

      const res = await request(app)
        .post("/api/signup")
        .send({
          firstName: "akshay",
          lastName: "saxena",
          email: "akshay@gmail.com",
          password: "Akshay@123",
        });

      expect(res.status).toBe(500);
      expect(res.body.error).toBe("Failed to sign up user");
    });
  });

  describe("Login", () => {
    it("should return 400 if email or password is invalid", async () => {
      User.findOne.mockResolvedValueOnce(null);

      const res = await request(app)
        .post("/api/login")
        .send({ email: "akshay@gmail.com", password: "Akshay@123" });

      expect(res.status).toBe(400);
      expect(res.body.error).toBe("Invalid email or password");
    });

    it("should return 200 and a token if login is successful", async () => {
      const user = {
        _id: new mongoose.Types.ObjectId().toHexString(),
        firstName: "akshay",
        lastName: "saxena",
        email: "akshay@gmail.com",
        password: "hashedpassword",
      };
      User.findOne.mockResolvedValueOnce(user);
      bcrypt.compare.mockResolvedValueOnce(true);
      jwt.sign.mockReturnValueOnce("token");

      const res = await request(app)
        .post("/api/login")
        .send({ email: "akshay@gmail.com", password: "Akshay@123" });

      expect(res.status).toBe(200);
      expect(res.body.token).toBe("token");
      expect(res.body.user.email).toBe("akshay@gmail.com");
    });

    it("should return 500 if there is a server error", async () => {
      User.findOne.mockRejectedValueOnce(new Error("Server Error"));

      const res = await request(app)
        .post("/api/login")
        .send({ email: "akshay@gmail.com", password: "Akshay@123" });

      expect(res.status).toBe(500);
      expect(res.body.error).toBe("Failed to log in user");
    });
  });
});
