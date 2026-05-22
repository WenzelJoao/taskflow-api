import type { HistoricoTarefa } from "../prisma/generated/prisma/client";
import {
    historicoTarefaRepository,
    type HistoricoTarefaRepository
} from "../repositories/HistoricoTarefaRepository";

export class HistoricoTarefaService {
    constructor(
        private readonly repository: HistoricoTarefaRepository
    ) {
    }

    async listarTodosHistoricos(pagina?: number, limite?: number) {
        const historicos = await this.repository.listarTodosHistoricos(
            pagina,
            limite
        )

        return historicos
    }

    async registrarHistorico(dadosHistorico: HistoricoTarefa) {

        if (!dadosHistorico.tarefaId || dadosHistorico.tarefaId <= 0) {
            throw new Error("ID da tarefa inválido");
        }

        if (!dadosHistorico.usuarioId || dadosHistorico.usuarioId <= 0) {
            throw new Error("ID do usuário inválido");
        }

        if (!dadosHistorico.acao || dadosHistorico.acao.trim() === "") {
            throw new Error("Ação é obrigatória");
        }

        const historicoCriado = await this.repository.criarHistorico({
            tarefaId: dadosHistorico.tarefaId,
            usuarioId: dadosHistorico.usuarioId,
            acao: dadosHistorico.acao,
            descricao: dadosHistorico.descricao,
            projetoId: dadosHistorico.projetoId
        })

        return historicoCriado
    }

    async buscarHistoricoTarefa(tarefaId: number) {

        if (tarefaId <= 0) {
            throw new Error("ID da tarefa inválido");
        }

        const historico = await this.repository.buscarHistoricoPorId(
            tarefaId
        )

        return historico
    }

    async buscarHistoricoProjeto(projetoId: number) {

        if (projetoId <= 0) {
            throw new Error("ID do projeto inválido");
        }

        const historico = await this.repository.buscarHistoricoPorId(
            projetoId
        )

        return historico
    }
}

export const historicoTarefaService =
    new HistoricoTarefaService(historicoTarefaRepository)