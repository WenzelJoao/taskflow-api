import { Request, Response } from "express";
import * as service from "../services/tarefaService";

export const create = async (req: Request, res: Response) => {
  try {
    const tarefa = await service.criarTarefa(req.body);
    res.status(201).json(tarefa);
  } catch (err: any) {
    res.status(400).json({ error: err.message });
  }
};

export const list = async (_req: Request, res: Response) => {
  const tarefas = await service.listTarefas();
  res.json(tarefas);
};

export const get = async (req: Request, res: Response) => {
  const id = Number(req.params.id);
  const tarefa = await service.getTarefa(id);
  if (!tarefa) return res.status(404).json({ error: "Not found" });
  res.json(tarefa);
};

export const update = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);
    const updated = await service.editTarefa(id, req.body);
    res.json(updated);
  } catch (err: any) {
    res.status(400).json({ error: err.message ?? String(err) });
  }
};

export const remove = async (req: Request, res: Response) => {
  const id = Number(req.params.id);
  await service.removeTarefa(id);
  res.status(204).send();
};
