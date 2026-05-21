// import type { Request, Response } from "express";
// import { ProjetoService } from "../services/ProjetoService";

// export class ProjetoController {
//   private service = new ProjetoService();

//   async criar(req: Request, res: Response) {
//     try {
//       const { titulo, descricao, areaConhecimento } = req.body;

//       const projeto = await this.service.criar({
//         titulo,
//         descricao,
//         areaConhecimento,
//       });

//       return res.status(201).json(projeto);
//     } catch (error: any) {
//       return res.status(400).json({ erro: error.message });
//     }
//   }

//   async obterTodos(req: Request, res: Response) {
//     try {
//       const projetos = await this.service.obterTodos();
//       return res.status(200).json(projetos);
//     } catch (error: any) {
//       return res.status(500).json({ erro: error.message });
//     }
//   }

//   async obterPorId(req: Request, res: Response) {
//     try {
//       const { id } = req.params;
//       const projeto = await this.service.obterPorId(Number(id));

//       return res.status(200).json(projeto);
//     } catch (error: any) {
//       return res.status(404).json({ erro: error.message });
//     }
//   }

//   async atualizar(req: Request, res: Response) {
//     try {
//       const { id } = req.params;
//       const { titulo, descricao, areaConhecimento } = req.body;

//       const projeto = await this.service.atualizar(Number(id), {
//         titulo,
//         descricao,
//         areaConhecimento,
//       });

//       return res.status(200).json(projeto);
//     } catch (error: any) {
//       return res.status(404).json({ erro: error.message });
//     }
//   }
// }






import type { Request, Response } from "express";
import { ProjetoService, projetoService } from "../services/ProjetoService";

class ProjetoController {
    constructor(private readonly service: ProjetoService) {
    }

    async criar(req: Request, res: Response) {
        try {
            const dadosProjeto = req.body

            const projeto = await this.service.criarProjeto(dadosProjeto)

            return res.status(201).json(projeto)
        } catch (error) {
            console.log(error)

            return res.status(404).json({
                error
            })
        }
    }

    async obterTodos(req: Request, res: Response) {
        try {
            const projetos = await this.service.listarTodosProjetos()

            return res.status(200).json(projetos)
        } catch (error) {
            console.log(error)

            return res.status(404).json({
                error
            })
        }
    }

    async obterPorId(req: Request, res: Response) {
        try {
            const idProjeto = Number(req.params.id)

            const projeto = await this.service.buscarProjetoId(idProjeto)

            return res.status(200).json(projeto)
        } catch (error) {
            console.log(error)

            return res.status(404).json({
                error
            })
        }
    }

    async atualizar(req: Request, res: Response) {
        try {
            const idProjeto = Number(req.params.id)

            const dadosParaAtualizar = req.body

            const projetoAtualizado = await this.service.atualizarProjeto(
                idProjeto,
                dadosParaAtualizar
            )

            return res.status(200).json(projetoAtualizado)
        } catch (error) {
            console.log(error)

            return res.status(404).json({
                error
            })
        }
    }
}

export const projetoController = new ProjetoController(projetoService)