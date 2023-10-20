import express from "express";
const router = express.Router();

import CinemaController from "../controllers/CinemaController.js";
import SalonController from "../controllers/SalonController.js";
import FilmController from "../controllers/FilmController.js";
import UserController from "../controllers/UserController.js";
import TicketController from "../controllers/TicketController.js";

router.post("/cinemas", CinemaController.createCinema);
router.get("/cinemas/:id", CinemaController.getCinemaById);
router.put("/cinemas/:id", CinemaController.updateCinema);
router.delete("/cinemas/:id", CinemaController.deleteCinema);

router.post("/salons", SalonController.createSalon);
router.get("/salons/:id", SalonController.getSalonById);
router.put("/salons/:id", SalonController.updateSalon);
router.delete("/salons/:id", SalonController.deleteSalon);

router.post("/films", FilmController.createFilm);
router.get("/films/:id", FilmController.getFilmById);
router.put("/films/:id", FilmController.updateFilm);
router.delete("/films/:id", FilmController.deleteFilm);

router.post("/users", UserController.createUser);
router.get("/users/:id", UserController.getUserById);
router.put("/users/:id", UserController.updateUser);
router.delete("/users/:id", UserController.deleteUser);

router.post("/tickets", TicketController.createTicket);
router.get("/tickets/:id", TicketController.getTicketById);
router.put("/tickets/:id", TicketController.updateTicket);
router.delete("/tickets/:id", TicketController.deleteTicket);

export default router;
