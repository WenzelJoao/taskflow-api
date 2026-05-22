import type { PrismaClient, Projeto } from "../prisma/generated/prisma/client";
import { prisma } from "../prisma/prisma";

export class ProjetoRepository {
    constructor(private readonly prisma: PrismaClient) {
        this.prisma = prisma;
    }

    async listarTodosProjetos(pagina?: number, limite?: number) {
        const existePaginacao = pagina! && limite!;

        if (!existePaginacao) {
            return await prisma.projeto.findMany({
                include: {
                    tarefas: true
                },
                orderBy: {
                    createdAt: "desc"
                }
            });
        }

        const projetos = await prisma.projeto.findMany({
            skip: (pagina - 1) * limite,
            take: limite,
            include: {
                tarefas: true
            },
            orderBy: {
                createdAt: "desc"
            }
        });

        const total = await prisma.projeto.count();
        const totalPaginas = Math.ceil(total / limite);

        return {
            projetos,
            total,
            totalPaginas
        };
    }

    async buscarProjetoPorId(idProjeto: number) {
        const projeto = await prisma.projeto.findUnique({
            where: {
                id: idProjeto
            },
            include: {
                tarefas: true,
                historicos: true
            }
        });

        return projeto;
    }

    async criarProjeto(dadosProjeto: Partial<Projeto>) {
        return await this.prisma.projeto.create({
            data: {
                titulo: dadosProjeto.titulo || "",
                descricao: dadosProjeto.descricao || "",
                area_conhecimento: dadosProjeto.area_conhecimento || ""
            }
        });
    }

    async atualizarProjeto(
        idProjeto: number,
        dadosParaAtualizar: Omit<Projeto, "id">
    ) {
        const projetoAtualizado = await prisma.projeto.update({
            data: {
                ...dadosParaAtualizar
            },
            where: {
                id: idProjeto
            }
        });

        return projetoAtualizado;
    }

    async deletarProjeto(idProjeto: number) {
        const projeto = await prisma.projeto.delete({
            where: {
                id: idProjeto
            }
        });

        return projeto;
    }

    async verificarExistencia(idProjeto: number) {
        const projeto = await prisma.projeto.findUnique({
            where: {
                id: idProjeto
            }
        });

        return !!projeto;
    }
}

export const projetoRepository = new ProjetoRepository(prisma);