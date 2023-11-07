import express, { Express, Request, Response, Application } from "express";
import dotenv from "dotenv";
import { PrismaClient } from "./prisma/generated/client";
import router from "./src/routes/routes.ts";
import cors from "cors";

dotenv.config();

const app: Application = express();
const prisma = new PrismaClient();

const port = process.env.PORT || 8000;
app.use(
  cors({
    origin: "http://localhost:5173",
  })
);
app.use(express.json());
app.use("/api", router);

app.get("/", (req: Request, res: Response) => {
  res.send("Welcome to Express & TypeScript Server");
});

app.listen(port, () => {
  console.log(`Server is Fire at http://localhost:${port}`);
});
