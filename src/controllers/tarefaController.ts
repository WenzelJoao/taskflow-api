import type { Request, Response } from "express";
import { TarefaService, tarefaService } from "../services/tarefaService";

class TarefaController {
    constructor(private readonly service: TarefaService) {}

    async listarTodasTarefas(_: Request, res: Response) {
        try {
            const tarefas = await this.service.Tarefas();
            return res.status(200).json(tarefas);
        } catch (error) {
            console.log(error);
            return res.status(404).json({ error });
        }
    }

    async criarTarefa(req: Request, res: Response) {
        try {
            const dados = req.body;
            const tarefaCriada = await this.service.criarTarefa(dados);
            return res.status(201).json(tarefaCriada);
        } catch (error: any) {
            console.log(error);
            return res.status(400).json({ error: error.message ?? error });
        }
    }

    async buscarTarefaId(req: Request, res: Response) {
        try {
            const id = Number(req.params.id);
            const tarefa = await this.service.tarefaId(id);
            if (!tarefa) return res.status(404).json({ error: "Not found" });
            return res.status(200).json(tarefa);
        } catch (error) {
            console.log(error);
            return res.status(404).json({ error });
        }
    }

    async atualizarTarefa(req: Request, res: Response) {
        try {
            const id = Number(req.params.id);
            const dadosParaAtualizar = req.body;
            const tarefaAtualizada = await this.service.editTarefa(id, dadosParaAtualizar);
            return res.status(200).json(tarefaAtualizada);
        } catch (error: any) {
            console.log(error);
            return res.status(400).json({ error: error.message ?? String(error) });
        }
    }

    async deletarTarefa(req: Request, res: Response) {
        try {
            const id = Number(req.params.id);
            await this.service.removeTarefa(id);
            return res.status(204).send();
        } catch (error) {
            console.log(error);
            return res.status(404).json({ error });
        }
    }
}

export const tarefaController = new TarefaController(tarefaService);