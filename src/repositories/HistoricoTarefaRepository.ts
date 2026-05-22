import type { HistoricoTarefa, PrismaClient } from "../prisma/generated/prisma/client";
import { prisma } from "../prisma/prisma";

export class HistoricoTarefaRepository {
  constructor(private readonly prisma: PrismaClient) {
    this.prisma = prisma;
  }

  async listarTodosHistoricos(pagina?: number, limite?: number) {
    const existePaginacao = pagina! && limite!;

    if (!existePaginacao) {
      return await prisma.historicoTarefa.findMany({
        include: {
          usuario: {
            select: {
              id: true,
              nome: true,
              email: true
            }
          },
          tarefa: {
            select: {
              id: true,
              titulo: true
            }
          }
        },
        orderBy: {
          createdAt: "desc"
        }
      });
    }

    const historicos = await prisma.historicoTarefa.findMany({
      skip: (pagina - 1) * limite,
      take: limite,
      include: {
        usuario: {
          select: {
            id: true,
            nome: true,
            email: true
          }
        },
        tarefa: {
          select: {
            id: true,
            titulo: true
          }
        }
      },
      orderBy: {
        createdAt: "desc"
      }
    });

    const total = await prisma.historicoTarefa.count();
    const totalPaginas = Math.ceil(total / limite);

    return {
      historicos,
      total,
      totalPaginas
    };
  }

  async buscarHistoricoPorId(idHistorico: number) {
    const historico = await prisma.historicoTarefa.findUnique({
      where: {
        id: idHistorico
      },
      include: {
        usuario: {
          select: {
            id: true,
            nome: true,
            email: true
          }
        },
        tarefa: {
          select: {
            id: true,
            titulo: true
          }
        }
      }
    });

    return historico;
  }

  async criarHistorico(dadosHistorico: Partial<HistoricoTarefa>) {
    return await this.prisma.historicoTarefa.create({
      data: {
        tarefaId: dadosHistorico.tarefaId || 0,
        usuarioId: dadosHistorico.usuarioId || 0,
        acao: dadosHistorico.acao || "",
        descricao: dadosHistorico.descricao || "",
        projetoId: dadosHistorico.projetoId || null
      }
    });
  }

  async atualizarHistorico(
    idHistorico: number,
    dadosParaAtualizar: Omit<HistoricoTarefa, "id">
  ) {
    const historicoAtualizado = await prisma.historicoTarefa.update({
      data: {
        ...dadosParaAtualizar
      },
      where: {
        id: idHistorico
      }
    });

    return historicoAtualizado;
  }

  async deletarHistorico(idHistorico: number) {
    const historico = await prisma.historicoTarefa.delete({
      where: {
        id: idHistorico
      }
    });

    return historico;
  }

  async obterPorTarefa(tarefaId: number) {
    return await prisma.historicoTarefa.findMany({
      where: {
        tarefaId
      },
      include: {
        usuario: {
          select: {
            id: true,
            nome: true,
            email: true
          }
        }
      },
      orderBy: {
        createdAt: "asc"
      }
    });
  }

  async obterPorProjeto(projetoId: number) {
    return await prisma.historicoTarefa.findMany({
      where: {
        projetoId
      },
      include: {
        usuario: {
          select: {
            id: true,
            nome: true,
            email: true
          }
        },
        tarefa: {
          select: {
            id: true,
            titulo: true
          }
        }
      },
      orderBy: {
        createdAt: "desc"
      }
    });
  }
}

export const historicoTarefaRepository = new HistoricoTarefaRepository(prisma);