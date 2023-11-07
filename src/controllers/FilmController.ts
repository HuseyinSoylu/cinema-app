import { Request, Response } from "express";
import { PrismaClient } from "../../prisma/generated/client";

const prisma = new PrismaClient();

class FilmController {
  public async createFilm(req: Request, res: Response): Promise<void> {
    try {
      const {
        Title,
        ComingSoon,
        Year,
        Rated,
        Released,
        Runtime,
        Genre,
        Director,
        Writer,
        Actors,
        Plot,
        Language,
        Country,
        Awards,
        Poster,
        Metascore,
        imdbRating,
        imdbVotes,
        imdbID,
        Type,
        Response,
        Images,
      } = req.body;

      const newFilm = await prisma.film.create({
        data: {
          Title,
          ComingSoon,
          Year,
          Rated,
          Released,
          Runtime,
          Genre,
          Director,
          Writer,
          Actors,
          Plot,
          Language,
          Country,
          Awards,
          Poster,
          Metascore,
          imdbRating,
          imdbVotes,
          imdbID,
          Type,
          Response,
          Images,
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
      const {
        Title,
        ComingSoon,
        Year,
        Rated,
        Released,
        Runtime,
        Genre,
        Director,
        Writer,
        Actors,
        Plot,
        Language,
        Country,
        Awards,
        Poster,
        Metascore,
        imdbRating,
        imdbVotes,
        imdbID,
        Type,
        Response,
        Images,
      } = req.body;

      const updatedFilm = await prisma.film.update({
        where: {
          id: filmId,
        },
        data: {
          Title,
          ComingSoon,
          Year,
          Rated,
          Released,
          Runtime,
          Genre,
          Director,
          Writer,
          Actors,
          Plot,
          Language,
          Country,
          Awards,
          Poster,
          Metascore,
          imdbRating,
          imdbVotes,
          imdbID,
          Type,
          Response,
          Images: {
            set: Images,
          },
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

  public async getAllFilms(req: Request, res: Response): Promise<void> {
    try {
      const { comingSoon } = req.query;

      let films;

      if (comingSoon === "true") {
        films = await prisma.film.findMany({
          where: {
            ComingSoon: true,
          },
        });
      } else if (comingSoon === "false") {
        films = await prisma.film.findMany({
          where: {
            ComingSoon: false,
          },
        });
      } else {
        films = await prisma.film.findMany();
      }

      res.json(films);
    } catch (error) {
      console.error("Error fetching films:", error);
      res.status(500).json({ error: "Failed to retrieve films" });
    }
  }
}

export default new FilmController();
