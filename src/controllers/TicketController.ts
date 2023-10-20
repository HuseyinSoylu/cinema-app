import { Request, Response } from "express";
import { PrismaClient } from "../../prisma/generated/client";

const prisma = new PrismaClient();

class TicketController {
  // Create a new ticket
  public async createTicket(req: Request, res: Response): Promise<void> {
    try {
      const { filmId, userId, seat, price, paymentId, showtime } = req.body;
      const newTicket = await prisma.ticket.create({
        data: {
          filmId,
          userId,
          seat,
          price,
          paymentId,
          showtime,
        },
      });
      res.status(201).json(newTicket);
    } catch (error) {
      console.error("Error creating ticket:", error);
      res.status(500).json({ error: "Ticket creation failed" });
    }
  }

  // Get a ticket by ID
  public async getTicketById(req: Request, res: Response): Promise<void> {
    try {
      const ticketId = parseInt(req.params.id);
      const ticket = await prisma.ticket.findUnique({
        where: {
          id: ticketId,
        },
      });
      if (!ticket) {
        res.status(404).json({ error: "Ticket not found" });
        return;
      }
      res.json(ticket);
    } catch (error) {
      console.error("Error fetching ticket:", error);
      res.status(500).json({ error: "Ticket retrieval failed" });
    }
  }

  // Update a ticket's information
  public async updateTicket(req: Request, res: Response): Promise<void> {
    try {
      const ticketId = parseInt(req.params.id);
      const { filmId, userId, seat, price, paymentId, showtime } = req.body;
      const updatedTicket = await prisma.ticket.update({
        where: {
          id: ticketId,
        },
        data: {
          filmId,
          userId,
          seat,
          price,
          paymentId,
          showtime,
        },
      });
      res.json(updatedTicket);
    } catch (error) {
      console.error("Error updating ticket:", error);
      res.status(500).json({ error: "Ticket update failed" });
    }
  }

  // Delete a ticket by ID
  public async deleteTicket(req: Request, res: Response): Promise<void> {
    try {
      const ticketId = parseInt(req.params.id);
      await prisma.ticket.delete({
        where: {
          id: ticketId,
        },
      });
      res.json({ message: "Ticket deleted successfully" });
    } catch (error) {
      console.error("Error deleting ticket:", error);
      res.status(500).json({ error: "Ticket deletion failed" });
    }
  }
}

export default new TicketController();
