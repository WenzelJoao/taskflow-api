import type { Tarefa } from "../prisma/generated/prisma/client.js";
export type TaskEntity = Tarefa;
export interface CreateTaskDTO {
    titulo: string;
    descricao: string;
    data_vencimento: string | Date;
    prioridade: string;
    usuarioId?: number;
    projetoId?: number;
}
export interface UpdateTaskDTO {
    titulo?: string;
    descricao?: string;
    data_vencimento?: string | Date;
    prioridade?: string;
    usuarioId?: number | null;
    projetoId?: number | null;
}
export interface TaskFilters {
    usuarioId?: number;
    projetoId?: number;
    prioridade?: string;
    data_vencimento?: string | Date;
}
export interface ParsedTaskFilters {
    usuarioId?: number;
    projetoId?: number;
    prioridade?: string;
    data_vencimento?: Date;
}
export interface TaskResponse {
    id: number;
    titulo: string;
    descricao: string;
    data_vencimento: Date;
    prioridade: string;
    usuarioId: number | null;
    projetoId: number | null;
}
export declare class AppError extends Error {
    readonly statusCode: number;
    constructor(message: string, statusCode: number);
}
//# sourceMappingURL=task.types.d.ts.map