import { prisma } from "../prisma/prisma";
import type { PrismaClient, Prisma, Usuario, Tarefa } from "../prisma/generated/prisma/client";

export class TarefaRepository {
  constructor(private readonly prisma: PrismaClient) {
    this.prisma = prisma;
  }

  async listarTodasTarefas() {
    return this.prisma.tarefa.findMany({ orderBy: { data_vencimento: "asc" } });
  }

  async buscarTarefaPorId(idTarefa: number) {
    return this.prisma.tarefa.findUnique({ where: { id: idTarefa } });
  }

  async criarTarefa(dadosTarefa: any) {

    console.log("criando tarefa", dadosTarefa);
    return await this.prisma.tarefa.create({
      data: {
        titulo: dadosTarefa.titulo || "",
        descricao: dadosTarefa.descricao || "",
        data_vencimento: dadosTarefa.data_vencimento ? new Date(String(dadosTarefa.data_vencimento)) : new Date(),
        prioridade: dadosTarefa.prioridade || "Média",
        usuarioId: dadosTarefa.usuarioId || undefined,
        projetoId: dadosTarefa.projetoId || undefined
      }
    })
  }

  async atualizarTarefa(idTarefa: number, dadosParaAtualizar: Omit<Tarefa, 'id'>) {

    const tarefaAtualizada = await prisma.tarefa.update({
      data: {
        ...dadosParaAtualizar
      },
      where : {
        id: idTarefa
      }
    })
    return tarefaAtualizada
  }

  async deletarTarefa(idTarefa: number) {
    return this.prisma.tarefa.delete({ where: { id: idTarefa } });
  }
}

export const tarefaRepository = new TarefaRepository(prisma);
