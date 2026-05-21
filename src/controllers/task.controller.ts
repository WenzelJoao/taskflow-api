import type { Request, Response } from "express";
import { TaskService } from "../services/task.service.js";
import { AppError, type CreateTaskDTO, type TaskFilters, type UpdateTaskDTO } from "../types/task.types.js";

export class TaskController {
  constructor(private readonly taskService: TaskService) {}

  async create(req: Request, res: Response): Promise<Response> {
    try {
      const payload = req.body as CreateTaskDTO;
      const task = await this.taskService.createTask(payload);

      return res.status(201).json(task);
    } catch (error) {
      return this.handleError(error, res);
    }
  }

  async list(req: Request, res: Response): Promise<Response> {
    try {
      const usuarioId = this.parseOptionalNumber(req.query.usuarioId);
      const projetoId = this.parseOptionalNumber(req.query.projetoId);
      const prioridade = this.parseOptionalString(req.query.prioridade);
      const dataVencimento = this.parseOptionalString(req.query.data_vencimento);
      const filters: TaskFilters = {
        ...(usuarioId !== undefined ? { usuarioId } : {}),
        ...(projetoId !== undefined ? { projetoId } : {}),
        ...(prioridade !== undefined ? { prioridade } : {}),
        ...(dataVencimento !== undefined ? { data_vencimento: dataVencimento } : {}),
      };

      const tasks = await this.taskService.listTasks(filters);

      return res.status(200).json(tasks);
    } catch (error) {
      return this.handleError(error, res);
    }
  }

  async getById(req: Request, res: Response): Promise<Response> {
    try {
      const task = await this.taskService.getTaskById(Number(req.params.id));

      return res.status(200).json(task);
    } catch (error) {
      return this.handleError(error, res);
    }
  }

  async update(req: Request, res: Response): Promise<Response> {
    try {
      const payload = req.body as UpdateTaskDTO;
      const task = await this.taskService.updateTask(Number(req.params.id), payload);

      return res.status(200).json(task);
    } catch (error) {
      return this.handleError(error, res);
    }
  }

  async delete(req: Request, res: Response): Promise<Response> {
    try {
      await this.taskService.deleteTask(Number(req.params.id));

      return res.status(204).send();
    } catch (error) {
      return this.handleError(error, res);
    }
  }

  private handleError(error: unknown, res: Response): Response {
    if (error instanceof AppError) {
      return res.status(error.statusCode).json({ message: error.message });
    }

    console.error(error);
    return res.status(500).json({ message: "Erro interno do servidor." });
  }

  private parseOptionalNumber(value: unknown): number | undefined {
    if (typeof value !== "string" || value.trim().length === 0) {
      return undefined;
    }

    return Number(value);
  }

  private parseOptionalString(value: unknown): string | undefined {
    if (typeof value !== "string" || value.trim().length === 0) {
      return undefined;
    }

    return value;
  }
}
