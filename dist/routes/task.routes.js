import { Router } from "express";
import { TaskController } from "../controllers/task.controller.js";
export const createTaskRoutes = (taskController) => {
    const router = Router();
    router.post("/", (req, res) => taskController.create(req, res));
    router.get("/", (req, res) => taskController.list(req, res));
    router.get("/:id", (req, res) => taskController.getById(req, res));
    router.put("/:id", (req, res) => taskController.update(req, res));
    router.delete("/:id", (req, res) => taskController.delete(req, res));
    return router;
};
//# sourceMappingURL=task.routes.js.map