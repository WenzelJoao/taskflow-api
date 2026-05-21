import type { Projeto } from "../prisma/generated/prisma/client";
import { projetoRepository, type ProjetoRepository } from "../repositories/ProjetoRepository";

export class ProjetoService {
    constructor(private readonly repository: ProjetoRepository) {
    }

    async listarTodosProjetos(pagina?: number, limite?: number) {
        const projetos = await this.repository.listarTodosProjetos(pagina, limite)
        return projetos
    }

    async criarProjeto(dadosProjeto: Projeto) {

        if (!dadosProjeto.titulo || dadosProjeto.titulo.trim() === "") {
            throw new Error("Título do projeto é obrigatório");
        }

        if (!dadosProjeto.areaConhecimento || dadosProjeto.areaConhecimento.trim() === "") {
            throw new Error("Área de conhecimento é obrigatória");
        }

        const projetoCriado = await this.repository.criarProjeto({
            titulo: dadosProjeto.titulo,
            descricao: dadosProjeto.descricao,
            areaConhecimento: dadosProjeto.areaConhecimento
        })

        return projetoCriado
    }

    async buscarProjetoId(idProjeto: number) {

        if (idProjeto <= 0) {
            throw new Error("ID inválido");
        }

        const projeto = await this.repository.buscarProjetoPorId(idProjeto);

        if (!projeto) {
            throw new Error("Projeto não encontrado");
        }

        return projeto;
    }

    async atualizarProjeto(
        idProjeto: number,
        dadosParaAtualizar: Omit<Projeto, "id">
    ) {

        const projetoExiste = await this.repository.verificarExistencia(idProjeto);

        if (!projetoExiste) {
            throw new Error("Projeto não encontrado");
        }

        if (
            dadosParaAtualizar.titulo !== undefined &&
            dadosParaAtualizar.titulo.trim() === ""
        ) {
            throw new Error("Título não pode estar vazio");
        }

        if (
            dadosParaAtualizar.areaConhecimento !== undefined &&
            dadosParaAtualizar.areaConhecimento.trim() === ""
        ) {
            throw new Error("Área de conhecimento não pode estar vazia");
        }

        const projetoAtualizado = await this.repository.atualizarProjeto(
            idProjeto,
            dadosParaAtualizar
        )

        return projetoAtualizado;
    }

    async deletarProjeto(idProjeto: number) {

        const projetoExiste = await this.repository.verificarExistencia(idProjeto);

        if (!projetoExiste) {
            throw new Error("Projeto não encontrado");
        }

        const projeto = await this.repository.deletarProjeto(idProjeto);

        return projeto;
    }
}

export const projetoService = new ProjetoService(projetoRepository)