import type { Request, Response } from "express";
import { TaskService } from "../services/task.service.js";
export declare class TaskController {
    private readonly taskService;
    constructor(taskService: TaskService);
    create(req: Request, res: Response): Promise<Response>;
    list(req: Request, res: Response): Promise<Response>;
    getById(req: Request, res: Response): Promise<Response>;
    update(req: Request, res: Response): Promise<Response>;
    delete(req: Request, res: Response): Promise<Response>;
    private handleError;
    private parseOptionalNumber;
    private parseOptionalString;
}
//# sourceMappingURL=task.controller.d.ts.map