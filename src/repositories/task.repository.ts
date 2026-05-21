import type { Prisma, Tarefa } from "../prisma/generated/prisma/client.js";
import { prisma } from "../prisma/prisma.js";

export class TaskRepository {
  async create(data: Prisma.TarefaUncheckedCreateInput): Promise<Tarefa> {
    return prisma.tarefa.create({
      data,
    });
  }

  async findMany(where: Prisma.TarefaWhereInput): Promise<Tarefa[]> {
    return prisma.tarefa.findMany({
      where,
      orderBy: {
        data_vencimento: "asc",
      },
    });
  }

  async findById(id: number): Promise<Tarefa | null> {
    return prisma.tarefa.findUnique({
      where: { id },
    });
  }

  async update(id: number, data: Prisma.TarefaUncheckedUpdateInput): Promise<Tarefa> {
    return prisma.tarefa.update({
      where: { id },
      data,
    });
  }

  async delete(id: number): Promise<void> {
    await prisma.tarefa.delete({
      where: { id },
    });
  }
}
