import { TaskController } from "../controllers/task.controller.js";
import { TaskRepository } from "../repositories/task.repository.js";
import { createTaskRoutes } from "../routes/task.routes.js";
import { TaskService } from "../services/task.service.js";

export const createTaskRouter = () => {
  const taskRepository = new TaskRepository();
  const taskService = new TaskService(taskRepository);
  const taskController = new TaskController(taskService);

  return createTaskRoutes(taskController);
};
