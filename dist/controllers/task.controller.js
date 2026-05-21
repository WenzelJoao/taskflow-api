import { TaskService } from "../services/task.service.js";
import { AppError } from "../types/task.types.js";
export class TaskController {
    taskService;
    constructor(taskService) {
        this.taskService = taskService;
    }
    async create(req, res) {
        try {
            const payload = req.body;
            const task = await this.taskService.createTask(payload);
            return res.status(201).json(task);
        }
        catch (error) {
            return this.handleError(error, res);
        }
    }
    async list(req, res) {
        try {
            const usuarioId = this.parseOptionalNumber(req.query.usuarioId);
            const projetoId = this.parseOptionalNumber(req.query.projetoId);
            const prioridade = this.parseOptionalString(req.query.prioridade);
            const dataVencimento = this.parseOptionalString(req.query.data_vencimento);
            const filters = {
                ...(usuarioId !== undefined ? { usuarioId } : {}),
                ...(projetoId !== undefined ? { projetoId } : {}),
                ...(prioridade !== undefined ? { prioridade } : {}),
                ...(dataVencimento !== undefined ? { data_vencimento: dataVencimento } : {}),
            };
            const tasks = await this.taskService.listTasks(filters);
            return res.status(200).json(tasks);
        }
        catch (error) {
            return this.handleError(error, res);
        }
    }
    async getById(req, res) {
        try {
            const task = await this.taskService.getTaskById(Number(req.params.id));
            return res.status(200).json(task);
        }
        catch (error) {
            return this.handleError(error, res);
        }
    }
    async update(req, res) {
        try {
            const payload = req.body;
            const task = await this.taskService.updateTask(Number(req.params.id), payload);
            return res.status(200).json(task);
        }
        catch (error) {
            return this.handleError(error, res);
        }
    }
    async delete(req, res) {
        try {
            await this.taskService.deleteTask(Number(req.params.id));
            return res.status(204).send();
        }
        catch (error) {
            return this.handleError(error, res);
        }
    }
    handleError(error, res) {
        if (error instanceof AppError) {
            return res.status(error.statusCode).json({ message: error.message });
        }
        console.error(error);
        return res.status(500).json({ message: "Erro interno do servidor." });
    }
    parseOptionalNumber(value) {
        if (typeof value !== "string" || value.trim().length === 0) {
            return undefined;
        }
        return Number(value);
    }
    parseOptionalString(value) {
        if (typeof value !== "string" || value.trim().length === 0) {
            return undefined;
        }
        return value;
    }
}
//# sourceMappingURL=task.controller.js.map