import { Router } from "express";
import { projetoController } from "../controllers/ProjetoController";


export const projetoRoutes = Router();

projetoRoutes.post("/projeto", (req, res) => projetoController.criar(req, res));
projetoRoutes.get("/projeto", (req, res) => projetoController.obterTodos(req, res));
projetoRoutes.get("/projeto/:id", (req, res) => projetoController.obterPorId(req, res));
projetoRoutes.put("/projeto/:id", (req, res) => projetoController.atualizar(req, res));


