import { Router } from "express";
import { projetoController } from "../controllers/ProjetoController";

const router = Router();

router.post("/", (req, res) => projetoController.criar(req, res));
router.get("/", (req, res) => projetoController.obterTodos(req, res));
router.get("/:id", (req, res) => projetoController.obterPorId(req, res));
router.put("/:id", (req, res) => projetoController.atualizar(req, res));

export default router;
