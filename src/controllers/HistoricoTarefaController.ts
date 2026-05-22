// import type { Request, Response } from "express";
// import { HistoricoTarefaService } from "../services/HistoricoTarefaService";

// export class HistoricoTarefaController {
//   constructor(private service: HistoricoTarefaService) {
    
//   }

//   async obterHistoricoTarefa(req: Request, res: Response) {
//     try {
//       const { tarefaId } = req.params;
//       const historico = await this.service.obterHistoricoTarefa(Number(tarefaId));

//       return res.status(200).json(historico);
//     } catch (error: any) {
//       return res.status(400).json({ erro: error.message });
//     }
//   }

//   async obterHistoricoProjeto(req: Request, res: Response) {
//     try {
//       const { projetoId } = req.params;
//       const historico = await this.service.obterHistoricoProjeto(
//         Number(projetoId)
//       );

//       return res.status(200).json(historico);
//     } catch (error: any) {
//       return res.status(400).json({ erro: error.message });
//     }
//   }

//   async obterTodos(req: Request, res: Response) {
//     try {
//       const historicos = await this.service.obterTodos();
//       return res.status(200).json(historicos);
//     } catch (error: any) {
//       return res.status(500).json({ erro: error.message });
//     }
//   }
// }






import type { Request, Response } from "express";
import { HistoricoTarefaService, historicoTarefaService } from "../services/HistoricoTarefaService";

class HistoricoTarefaController {
    constructor(private readonly service: HistoricoTarefaService) {
    }

    async obterHistoricoTarefa(req: Request, res: Response) {
        try {
            const tarefaId = Number(req.params.tarefaId)

            const historico = await this.service.buscarHistoricoTarefa(tarefaId)

            return res.status(200).json(historico)
        } catch (error) {
            console.log(error)

            return res.status(404).json({
                error
            })
        }
    }

    async obterHistoricoProjeto(req: Request, res: Response) {
        try {
            const projetoId = Number(req.params.projetoId)

            const historico = await this.service.buscarHistoricoProjeto(projetoId)

            return res.status(200).json(historico)
        } catch (error) {
            console.log(error)

            return res.status(404).json({
                error
            })
        }
    }

    async obterTodos(req: Request, res: Response) {
        try {
            const historicos = await this.service.listarTodosHistoricos()

            return res.status(200).json(historicos)
        } catch (error) {
            console.log(error)

            return res.status(404).json({
                error
            })
        }
    }
}

export const historicoTarefaController = new HistoricoTarefaController(historicoTarefaService)