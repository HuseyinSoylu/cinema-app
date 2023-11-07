import { Request, Response } from "express";
import { PrismaClient } from "../../prisma/generated/client";
import { logger } from "../utils/logger";
import { validationResult, Result, ValidationError } from "express-validator";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

class UserController {
  // Create a new user
  public async createUser(req: Request, res: Response): Promise<Response> {
    const validationErrors: Result<ValidationError> = validationResult(req);

    if (!validationErrors.isEmpty()) {
      const errors = validationErrors.array();
      logger.error("Validation errors:");
      errors.forEach((error) => {
        logger.error(`${error.msg}`);
      });

      return res.status(400).json({ errors });
    }

    try {
      const { name, email, password } = req.body;
      const newUser = await prisma.user.create({
        data: {
          name,
          email,
          password,
        },
      });
      return res.status(201).json(newUser);
    } catch (error) {
      console.error("Error creating user:", error);
      return res.status(500).json({ error: "User creation failed" });
    }
  }

  // Update a user's information
  public async updateUser(req: Request, res: Response): Promise<Response> {
    const validationErrors: Result<ValidationError> = validationResult(req);

    if (!validationErrors.isEmpty()) {
      const errors = validationErrors.array();
      logger.error("Validation errors on updateUser:");
      errors.forEach((error) => {
        logger.error(`${error.msg}`);
      });

      return res.status(400).json({ errors });
    }

    try {
      const userId = parseInt(req.params.id);
      const { name, email, password } = req.body;
      const updatedUser = await prisma.user.update({
        where: {
          id: userId,
        },
        data: {
          name,
          email,
          password,
        },
      });
      return res.json(updatedUser);
    } catch (error) {
      console.error("Error updating user:", error);
      return res.status(500).json({ error: "User update failed" });
    } finally {
      await prisma.$disconnect();
    }
  }

  public async getUserById(req: Request, res: Response): Promise<void> {
    try {
      const userId = parseInt(req.params.id);
      const user = await prisma.user.findUnique({
        where: {
          id: userId,
        },
      });
      if (!user) {
        res.status(404).json({ error: "User not found" });
        return;
      }
      res.json(user);
    } catch (error) {
      console.error("Error fetching user:", error);
      res.status(500).json({ error: "User retrieval failed" });
    }
  }

  // Delete a user by ID
  public async deleteUser(req: Request, res: Response): Promise<void> {
    try {
      const userId = parseInt(req.params.id);
      await prisma.user.delete({
        where: {
          id: userId,
        },
      });
      res.json({ message: "User deleted successfully" });
    } catch (error) {
      console.error("Error deleting user:", error);
      res.status(500).json({ error: "User deletion failed" });
    }
  }

  public async login(req: Request, res: Response): Promise<void> {
    const { email, password } = req.body;

    try {
      const user = await prisma.user.findUnique({
        where: {
          email,
        },
      });

      if (!user) {
        res.status(401).json({ message: "User not found" });
        return;
      }

      const passwordMatch = await bcrypt.compare(password, user.password);

      if (!passwordMatch) {
        res.status(401).json({ message: "Invalid password" });
        return;
      }

      const token = jwt.sign({ userId: user.id }, "octopus", {
        expiresIn: "1h",
      });

      res.json({ user, token });
    } catch (error) {
      console.error("Login failed:", error);
      res.status(500).json({ message: "Login failed" });
    }
  }

  public async register(req: Request, res: Response): Promise<void> {
    const { name, email, password } = req.body;

    try {
      // Check if the user with the provided email already exists
      const existingUser = await prisma.user.findUnique({
        where: {
          email,
        },
      });

      if (existingUser) {
        res
          .status(400)
          .json({ message: "User with this email already exists" });
        return; // Return early to avoid further execution
      }

      // Hash the password
      const hashedPassword = await bcrypt.hash(password, 10);

      // Create a new user
      const newUser = await prisma.user.create({
        data: {
          name,
          email,
          password: hashedPassword,
        },
      });

      const token = jwt.sign({ userId: newUser.id }, "your-secret-key", {
        expiresIn: "1h", // Set your preferred token expiration time
      });

      res.json({ user: newUser, token });
    } catch (error) {
      console.error("Registration failed:", error);
      res.status(500).json({ message: "Registration failed" });
    }
  }
}

export default new UserController();
