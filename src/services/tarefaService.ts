
import { Tarefa } from "../prisma/generated/prisma/client";
import { TarefaRepository, tarefaRepository } from "../repositories/tarefaRepository";

export class TarefaService{
  constructor(private readonly repository: TarefaRepository){

  }

  async criarTarefa(dadosTarefa: Tarefa) {
    const tarefaCriada = await this.repository.criarTarefa({
      titulo: dadosTarefa.titulo,
      descricao: dadosTarefa.descricao,
      data_vencimento: dadosTarefa.data_vencimento,
      prioridade: dadosTarefa.prioridade,
      usuarioId: dadosTarefa.usuarioId,
      projetoId: dadosTarefa.projetoId
    })
    return tarefaCriada
    }
  
    async Tarefas(){

     const listar = await this.repository.listarTodasTarefas();
    return listar
}
  async tarefaId(id: number){
    const listarId = await this.repository.buscarTarefaPorId(id)
    return listarId
  }
  async editTarefa(id: number, data:any){
    const editar = await this.repository.atualizarTarefa(id, data)
    return editar
  }
  async removeTarefa(id: number){
    const remover = await this.repository.deletarTarefa(id)
  }
};

export const tarefaService = new TarefaService(tarefaRepository)

