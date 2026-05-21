import { prisma } from "../prisma/prisma.js";
export class TaskRepository {
    async create(data) {
        return prisma.tarefa.create({
            data,
        });
    }
    async findMany(where) {
        return prisma.tarefa.findMany({
            where,
            orderBy: {
                data_vencimento: "asc",
            },
        });
    }
    async findById(id) {
        return prisma.tarefa.findUnique({
            where: { id },
        });
    }
    async update(id, data) {
        return prisma.tarefa.update({
            where: { id },
            data,
        });
    }
    async delete(id) {
        await prisma.tarefa.delete({
            where: { id },
        });
    }
}
//# sourceMappingURL=task.repository.js.map