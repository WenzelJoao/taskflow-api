import { Router } from "express";
import { tarefaController } from "../controllers/tarefaController";

const tarefaRouter = Router();

tarefaRouter.post("/tarefas", async (req, res) => {
  return tarefaController.criarTarefa(req, res);
});

tarefaRouter.get("/tarefas", async (_, res) => {
  return tarefaController.listarTodasTarefas(_, res);
});

tarefaRouter.get("/tarefas/:id", async (req, res) => {
  return tarefaController.buscarTarefaId(req, res);
});

tarefaRouter.put("/tarefas/:id", async (req, res) => {
  return tarefaController.atualizarTarefa(req, res);
});

tarefaRouter.delete("/tarefas/:id", async (req, res) => {
  return tarefaController.deletarTarefa(req, res);
});

export default tarefaRouter;