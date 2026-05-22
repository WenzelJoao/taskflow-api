import express from "express";
import cors from "cors";

import {projetoRoutes} from "./routes/ProjetoRoutes";
import historicoRoutes from "./routes/HistoricoTarefaRoutes";
import tarefaRouter from "./routes/tarefaRoutes";

const app = express();

app.use(express.json());
app.use(cors());

// Rotas
app.use(projetoRoutes);
app.use(historicoRoutes);
app.use(tarefaRouter)

const PORT = 3000;

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
