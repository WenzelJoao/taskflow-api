import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import tarefaRoutes from "./routes/tarefaRoutes";
import { PORT } from "./env";

const app = express();
app.use(cors());
app.use(bodyParser.json());

app.use(tarefaRoutes)

app.get("/", (_req: any, res: any) => res.json({ status: "ok" }));

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
