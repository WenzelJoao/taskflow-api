import { TaskRepository } from "../repositories/task.repository.js";
import { type CreateTaskDTO, type TaskFilters, type TaskResponse, type UpdateTaskDTO } from "../types/task.types.js";
export declare class TaskService {
    private readonly taskRepository;
    constructor(taskRepository: TaskRepository);
    createTask(data: CreateTaskDTO): Promise<TaskResponse>;
    listTasks(filters: TaskFilters): Promise<TaskResponse[]>;
    getTaskById(id: number): Promise<TaskResponse>;
    updateTask(id: number, data: UpdateTaskDTO): Promise<TaskResponse>;
    deleteTask(id: number): Promise<void>;
    private ensureTaskExists;
    private parseFilters;
    private validateId;
    private validateRequiredString;
    private validateOptionalString;
    private validateOptionalNumber;
    private parseDate;
    private toResponse;
}
//# sourceMappingURL=task.service.d.ts.map