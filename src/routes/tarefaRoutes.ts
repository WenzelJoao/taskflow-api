import { Router } from "express";
import * as controller from "../controllers/tarefaController";

const tarefaRouter = Router();

tarefaRouter.post("/tarefas", controller.create);
tarefaRouter.get("/tarefas", controller.list);
tarefaRouter.get("/tarefas/:id", controller.get);
tarefaRouter.put("/tarefas/:id", controller.update);
tarefaRouter.delete("/tarefas/:id", controller.remove);

export default tarefaRouter;
