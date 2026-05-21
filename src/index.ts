import express, { type Request, type Response } from "express";
import { createTaskRouter } from "./factories/task.factory.js";

const app = express();

app.use(express.json());
app.use("/tasks", createTaskRouter());

app.get("/health", (_req: Request, res: Response) => {
  res.status(200).json({ status: "ok" });
});

const port = Number(process.env.PORT ?? 3000);

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
