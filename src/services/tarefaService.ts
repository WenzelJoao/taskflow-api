import { tarefaRepository } from "../repositories/tarefaRepository";

export const criarTarefa = async (payload: any) => {

  if (!payload.titulo) throw new Error("titulo is required");
  if (!payload.descricao) throw new Error("descricao is required");
  if (!payload.data_vencimento) throw new Error("data_vencimento is required");
  if (!payload.prioridade) throw new Error("prioridade is required");

  return tarefaRepository.criarTarefa(payload);
};

export const listTarefas = async () => tarefaRepository.listarTodasTarefas();

export const getTarefa = async (id: number) => tarefaRepository.buscarTarefaPorId(id);

export const editTarefa = async (id: number, data: any) => tarefaRepository.atualizarTarefa(id, data);

export const removeTarefa = async (id: number) => tarefaRepository.deletarTarefa(id);
