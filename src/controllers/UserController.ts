import { Request, Response } from "express";
import { PrismaClient } from "../../prisma/generated/client";
import { logger } from "../utils/logger";
import { validationResult, Result, ValidationError } from "express-validator";
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
      res.json(updatedUser);
    } catch (error) {
      console.error("Error updating user:", error);
      res.status(500).json({ error: "User update failed" });
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
}

export default new UserController();
