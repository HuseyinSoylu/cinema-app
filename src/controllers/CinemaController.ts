import { Request, Response } from "express";
import { PrismaClient } from "../../prisma/generated/client";

const prisma = new PrismaClient();

class CinemaController {
  public async createCinema(req: Request, res: Response): Promise<void> {
    try {
      const { name, city, location, description } = req.body;
      const newCinema = await prisma.cinema.create({
        data: {
          name,
          city,
          location,
          description,
        },
      });
      res.status(201).json(newCinema);
    } catch (error) {
      console.error("Error creating cinema:", error);
      res.status(500).json({ error: "Cinema creation failed" });
    }
  }

  // Get a cinema by ID
  public async getCinemaById(req: Request, res: Response): Promise<void> {
    try {
      const cinemaId = parseInt(req.params.id);
      const cinema = await prisma.cinema.findUnique({
        where: {
          id: cinemaId,
        },
      });
      if (!cinema) {
        res.status(404).json({ error: "Cinema not found" });
        return;
      }
      res.json(cinema);
    } catch (error) {
      console.error("Error fetching cinema:", error);
      res.status(500).json({ error: "Cinema retrieval failed" });
    }
  }

  // Update a cinema's information
  public async updateCinema(req: Request, res: Response): Promise<void> {
    try {
      const cinemaId = parseInt(req.params.id);
      const { name, city, location, description } = req.body;
      const updatedCinema = await prisma.cinema.update({
        where: {
          id: cinemaId,
        },
        data: {
          name,
          city,
          location,
          description,
        },
      });
      res.json(updatedCinema);
    } catch (error) {
      console.error("Error updating cinema:", error);
      res.status(500).json({ error: "Cinema update failed" });
    }
  }

  // Delete a cinema by ID
  public async deleteCinema(req: Request, res: Response): Promise<void> {
    try {
      const cinemaId = parseInt(req.params.id);
      await prisma.cinema.delete({
        where: {
          id: cinemaId,
        },
      });
      res.json({ message: "Cinema deleted successfully" });
    } catch (error) {
      console.error("Error deleting cinema:", error);
      res.status(500).json({ error: "Cinema deletion failed" });
    }
  }

  public async getAllCinemas(req: Request, res: Response) {
    try {
      const cityParam = req.query.city as string | undefined;

      const filter = cityParam ? { city: cityParam } : {};

      const cinemas = await prisma.cinema.findMany({
        where: filter,
      });

      res.json(cinemas);
    } catch (error) {
      console.error("Error fetching cinemas:", error);
      res.status(500).json({ error: "Failed to retrieve cinemas" });
    } finally {
      await prisma.$disconnect();
    }
  }
}

export default new CinemaController();
