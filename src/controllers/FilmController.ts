import { Request, Response } from "express";
import { PrismaClient } from "../../prisma/generated/client";

const prisma = new PrismaClient();

class FilmController {
  public async createFilm(req: Request, res: Response): Promise<void> {
    try {
      const { title, description } = req.body; // Remove 'showtime'
      const newFilm = await prisma.film.create({
        data: {
          title,
          description,
        },
      });
      res.status(201).json(newFilm);
    } catch (error) {
      console.error("Error creating film:", error);
      res.status(500).json({ error: "Film creation failed" });
    }
  }
  // Get a film by ID
  public async getFilmById(req: Request, res: Response): Promise<void> {
    try {
      const filmId = parseInt(req.params.id);
      const film = await prisma.film.findUnique({
        where: {
          id: filmId,
        },
      });
      if (!film) {
        res.status(404).json({ error: "Film not found" });
        return;
      }
      res.json(film);
    } catch (error) {
      console.error("Error fetching film:", error);
      res.status(500).json({ error: "Film retrieval failed" });
    }
  }

  public async updateFilm(req: Request, res: Response): Promise<void> {
    try {
      const filmId = parseInt(req.params.id);
      const { title, description } = req.body; // Remove 'showtime'
      const updatedFilm = await prisma.film.update({
        where: {
          id: filmId,
        },
        data: {
          title,
          description,
        },
      });
      res.json(updatedFilm);
    } catch (error) {
      console.error("Error updating film:", error);
      res.status(500).json({ error: "Film update failed" });
    }
  }
  // Delete a film by ID
  public async deleteFilm(req: Request, res: Response): Promise<void> {
    try {
      const filmId = parseInt(req.params.id);
      await prisma.film.delete({
        where: {
          id: filmId,
        },
      });
      res.json({ message: "Film deleted successfully" });
    } catch (error) {
      console.error("Error deleting film:", error);
      res.status(500).json({ error: "Film deletion failed" });
    }
  }
}

export default new FilmController();
