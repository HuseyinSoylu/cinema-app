import { Request, Response } from "express";
import { PrismaClient } from "../../prisma/generated/client";

const prisma = new PrismaClient();

class SalonController {
  // Create a new salon
  public async createSalon(req: Request, res: Response): Promise<void> {
    try {
      const { name, capacity, cinemaId } = req.body;
      const newSalon = await prisma.salon.create({
        data: {
          name,
          capacity,
          cinemaId,
        },
      });
      res.status(201).json(newSalon);
    } catch (error) {
      console.error("Error creating salon:", error);
      res.status(500).json({ error: "Salon creation failed" });
    }
  }

  // Get a salon by ID
  public async getSalonById(req: Request, res: Response): Promise<void> {
    try {
      const salonId = parseInt(req.params.id);
      const salon = await prisma.salon.findUnique({
        where: {
          id: salonId,
        },
      });
      if (!salon) {
        res.status(404).json({ error: "Salon not found" });
        return;
      }
      res.json(salon);
    } catch (error) {
      console.error("Error fetching salon:", error);
      res.status(500).json({ error: "Salon retrieval failed" });
    }
  }

  // Update a salon's information
  public async updateSalon(req: Request, res: Response): Promise<void> {
    try {
      const salonId = parseInt(req.params.id);
      const { name, capacity, cinemaId } = req.body;
      const updatedSalon = await prisma.salon.update({
        where: {
          id: salonId,
        },
        data: {
          name,
          capacity,
          cinemaId,
        },
      });
      res.json(updatedSalon);
    } catch (error) {
      console.error("Error updating salon:", error);
      res.status(500).json({ error: "Salon update failed" });
    }
  }

  // Delete a salon by ID
  public async deleteSalon(req: Request, res: Response): Promise<void> {
    try {
      const salonId = parseInt(req.params.id);
      await prisma.salon.delete({
        where: {
          id: salonId,
        },
      });
      res.json({ message: "Salon deleted successfully" });
    } catch (error) {
      console.error("Error deleting salon:", error);
      res.status(500).json({ error: "Salon deletion failed" });
    }
  }
}

export default new SalonController();
