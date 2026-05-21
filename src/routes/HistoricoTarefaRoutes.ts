import { Router } from "express";
import { historicoTarefaController } from "../controllers/HistoricoTarefaController";

const router = Router();

router.get("/tarefa/:tarefaId", (req, res) =>
  historicoTarefaController.obterHistoricoTarefa(req, res)
);
router.get("/projeto/:projetoId", (req, res) =>
  historicoTarefaController.obterHistoricoProjeto(req, res)
);
router.get("/", (req, res) => historicoTarefaController.obterTodos(req, res));

export default router;
