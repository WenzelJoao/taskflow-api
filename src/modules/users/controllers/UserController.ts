import type { Request, Response } from "express";
import { userService, type UserService } from "../services/UserService";
import type { Usuario } from "../../../prisma/generated/prisma/client";

class UserController {
    constructor(private readonly service: UserService) {
    }

    async listarTodosUsuarios(_: Request, res: Response) {
        try {
            const usuarios = await this.service.listarTodosUsuario()
            const usuariosSemSenha = usuarios.map(
                ({ senha, ...usuario }) => usuario
            )

            return res.status(200).json(usuariosSemSenha)
        } catch (error) {
            console.log(error);
            return res.status(404).json({
                error
            })
        }
    }

    async buscarUsuarioId(req: Request, res: Response) {
        try {
            const idUsuario = Number(req.params.id)
            const usuario = await this.service.buscarUsuarioId(idUsuario)
            if (!usuario) {
                return res.status(404).json({
                    error: "Usuário não encontrado"
                })
            }

            const { senha, ...usuarioSemSenha } = usuario

            return res.status(200).json(usuarioSemSenha)
        } catch (error) {
            console.log(error);
            return res.status(404).json({
                error
            })
        }
    }

    async criarUsuario(req: Request, res: Response) {
        try {
            const dadosUsuario = req.body as Usuario
            const usuarioCriado = await this.service.criarUsuario(dadosUsuario)
            const { senha, ...usuarioSemSenha } = usuarioCriado

            return res.status(201).json(usuarioSemSenha)
        } catch (error) {
            console.log(error);
            return res.status(404).json({
                error
            })
        }
    }

    async atualizarUsuario(req: Request, res: Response) {
        try {
            const idUsuario = Number(req.params.id)
            const dadosParaAtualizar = req.body as Omit<Usuario, 'id'>
            const usuarioAtualizado = await this.service.atualizarUsuario(idUsuario, dadosParaAtualizar)
            const { senha, ...usuarioSemSenha } = usuarioAtualizado

            return res.status(200).json(usuarioSemSenha)
        } catch (error) {
            console.log(error);

            return res.status(404).json({
                error
            })
        }
    }

    async deletarUsuario(req: Request, res: Response) {
        try {
            const idUsuario = Number(req.params.id)
            const usuario = this.service.deletarUsuario(idUsuario)
            return res.status(200).json({
                mensagem: "Usuário deletado com sucesso!",
                data: usuario
            })
        } catch (error) {
            console.log(error);
            return res.status(404).json({
                error
            })
        }
    }
}

export const userController = new UserController(userService)
