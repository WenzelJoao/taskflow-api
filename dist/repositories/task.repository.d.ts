import type { Prisma, Tarefa } from "../prisma/generated/prisma/client.js";
export declare class TaskRepository {
    create(data: Prisma.TarefaUncheckedCreateInput): Promise<Tarefa>;
    findMany(where: Prisma.TarefaWhereInput): Promise<Tarefa[]>;
    findById(id: number): Promise<Tarefa | null>;
    update(id: number, data: Prisma.TarefaUncheckedUpdateInput): Promise<Tarefa>;
    delete(id: number): Promise<void>;
}
//# sourceMappingURL=task.repository.d.ts.map