import { TaskRepository } from "../repositories/task.repository.js";
import { AppError, } from "../types/task.types.js";
export class TaskService {
    taskRepository;
    constructor(taskRepository) {
        this.taskRepository = taskRepository;
    }
    async createTask(data) {
        this.validateRequiredString(data.titulo, "titulo");
        this.validateRequiredString(data.descricao, "descricao");
        this.validateRequiredString(data.prioridade, "prioridade");
        const dataVencimento = this.parseDate(data.data_vencimento, "data_vencimento");
        const usuarioId = data.usuarioId !== undefined ? this.validateOptionalNumber(data.usuarioId, "usuarioId") : undefined;
        const projetoId = data.projetoId !== undefined ? this.validateOptionalNumber(data.projetoId, "projetoId") : undefined;
        const task = await this.taskRepository.create({
            titulo: data.titulo.trim(),
            descricao: data.descricao.trim(),
            prioridade: data.prioridade.trim(),
            data_vencimento: dataVencimento,
            ...(usuarioId !== undefined ? { usuarioId } : {}),
            ...(projetoId !== undefined ? { projetoId } : {}),
        });
        return this.toResponse(task);
    }
    async listTasks(filters) {
        const parsedFilters = this.parseFilters(filters);
        const where = {
            ...(parsedFilters.usuarioId !== undefined ? { usuarioId: parsedFilters.usuarioId } : {}),
            ...(parsedFilters.projetoId !== undefined ? { projetoId: parsedFilters.projetoId } : {}),
            ...(parsedFilters.prioridade ? { prioridade: parsedFilters.prioridade } : {}),
            ...(parsedFilters.data_vencimento ? { data_vencimento: parsedFilters.data_vencimento } : {}),
        };
        const tasks = await this.taskRepository.findMany(where);
        return tasks.map((task) => this.toResponse(task));
    }
    async getTaskById(id) {
        const taskId = this.validateId(id);
        const task = await this.taskRepository.findById(taskId);
        if (!task) {
            throw new AppError("Tarefa nao encontrada.", 404);
        }
        return this.toResponse(task);
    }
    async updateTask(id, data) {
        const taskId = this.validateId(id);
        await this.ensureTaskExists(taskId);
        const updateData = {};
        if (data.titulo !== undefined) {
            this.validateRequiredString(data.titulo, "titulo");
            updateData.titulo = data.titulo.trim();
        }
        if (data.descricao !== undefined) {
            this.validateRequiredString(data.descricao, "descricao");
            updateData.descricao = data.descricao.trim();
        }
        if (data.prioridade !== undefined) {
            this.validateRequiredString(data.prioridade, "prioridade");
            updateData.prioridade = data.prioridade.trim();
        }
        if (data.data_vencimento !== undefined) {
            updateData.data_vencimento = this.parseDate(data.data_vencimento, "data_vencimento");
        }
        if (data.usuarioId !== undefined) {
            updateData.usuarioId =
                data.usuarioId === null ? null : this.validateOptionalNumber(data.usuarioId, "usuarioId");
        }
        if (data.projetoId !== undefined) {
            updateData.projetoId =
                data.projetoId === null ? null : this.validateOptionalNumber(data.projetoId, "projetoId");
        }
        if (Object.keys(updateData).length === 0) {
            throw new AppError("Nenhum campo valido foi enviado para atualizacao.", 400);
        }
        const updatedTask = await this.taskRepository.update(taskId, updateData);
        return this.toResponse(updatedTask);
    }
    async deleteTask(id) {
        const taskId = this.validateId(id);
        await this.ensureTaskExists(taskId);
        await this.taskRepository.delete(taskId);
    }
    async ensureTaskExists(id) {
        const task = await this.taskRepository.findById(id);
        if (!task) {
            throw new AppError("Tarefa nao encontrada.", 404);
        }
        return task;
    }
    parseFilters(filters) {
        return {
            ...(filters.usuarioId !== undefined
                ? { usuarioId: this.validateOptionalNumber(filters.usuarioId, "usuarioId") }
                : {}),
            ...(filters.projetoId !== undefined
                ? { projetoId: this.validateOptionalNumber(filters.projetoId, "projetoId") }
                : {}),
            ...(filters.prioridade !== undefined
                ? { prioridade: this.validateOptionalString(filters.prioridade, "prioridade") }
                : {}),
            ...(filters.data_vencimento !== undefined
                ? { data_vencimento: this.parseDate(filters.data_vencimento, "data_vencimento") }
                : {}),
        };
    }
    validateId(value) {
        if (!Number.isInteger(value) || value <= 0) {
            throw new AppError("ID da tarefa invalido.", 400);
        }
        return value;
    }
    validateRequiredString(value, fieldName) {
        if (typeof value !== "string" || value.trim().length === 0) {
            throw new AppError(`O campo ${fieldName} e obrigatorio.`, 400);
        }
    }
    validateOptionalString(value, fieldName) {
        if (typeof value !== "string" || value.trim().length === 0) {
            throw new AppError(`O campo ${fieldName} e invalido.`, 400);
        }
        return value.trim();
    }
    validateOptionalNumber(value, fieldName) {
        if (!Number.isInteger(value) || value <= 0) {
            throw new AppError(`O campo ${fieldName} deve ser um numero inteiro positivo.`, 400);
        }
        return value;
    }
    parseDate(value, fieldName) {
        const parsedDate = value instanceof Date ? value : new Date(value);
        if (Number.isNaN(parsedDate.getTime())) {
            throw new AppError(`O campo ${fieldName} deve ser uma data valida.`, 400);
        }
        return parsedDate;
    }
    toResponse(task) {
        return {
            id: task.id,
            titulo: task.titulo,
            descricao: task.descricao,
            data_vencimento: task.data_vencimento,
            prioridade: task.prioridade,
            usuarioId: task.usuarioId,
            projetoId: task.projetoId,
        };
    }
}
//# sourceMappingURL=task.service.js.map