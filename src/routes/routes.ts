import express from "express";
const router = express.Router();

import {
  createUserValidation,
  updateUserValidation,
} from "../middleware/validations.ts";
import CinemaController from "../controllers/CinemaController.ts";
import SalonController from "../controllers/SalonController.ts";
import FilmController from "../controllers/FilmController.ts";
import UserController from "../controllers/UserController.ts";
import TicketController from "../controllers/TicketController.ts";

router.post("/cinemas", CinemaController.createCinema);
router.get("/cinemas/all", CinemaController.getAllCinemas);
router.get("/cinemas/:id", CinemaController.getCinemaById);
router.put("/cinemas/:id", CinemaController.updateCinema);
router.delete("/cinemas/:id", CinemaController.deleteCinema);

router.post("/salons", SalonController.createSalon);
router.get("/salons/:id", SalonController.getSalonById);
router.put("/salons/:id", SalonController.updateSalon);
router.delete("/salons/:id", SalonController.deleteSalon);

router.post("/films", FilmController.createFilm);
router.get("/films/", FilmController.getAllFilms);
router.get("/films/:id", FilmController.getFilmById);
router.put("/films/:id", FilmController.updateFilm);
router.delete("/films/:id", FilmController.deleteFilm);

router.post("/users", createUserValidation, UserController.createUser);
router.get("/users/:id", UserController.getUserById);
router.put("/users/:id", updateUserValidation, UserController.updateUser);
router.post("/register", UserController.register);
router.post("/login", UserController.login);
router.delete("/users/:id", UserController.deleteUser);

router.post("/tickets", TicketController.createTicket);
router.get("/tickets/:id", TicketController.getTicketById);
router.put("/tickets/:id", TicketController.updateTicket);
router.delete("/tickets/:id", TicketController.deleteTicket);

export default router;
