
import type { Usuario } from "../../../prisma/generated/prisma/client";
import { createHash } from "../../../utils/createHash";
import { userRepository, type UserRepository } from "../repositories/UserRepository";


export class UserService {
    constructor(private readonly repository: UserRepository) {
    }

    async listarTodosUsuario() {
        const usuarios = await this.repository.listarTodosUsuarios()
        return usuarios
    }

    async buscarUsuarioId(idUsuario: number) {
        const usuario = await this.repository.buscarUsuarioId(idUsuario)
        return usuario
    }

    async criarUsuario(dadosUsuario: Usuario) {
        const usuarioExiste = await this.repository.buscarPorEmail(
            dadosUsuario.email
        );

        if (usuarioExiste) {
            throw new Error("Usuário já cadastrado");
        }

        const hash = await createHash(dadosUsuario.senha)

        const usuarioCriado = await this.repository.criarUsuario({
            email: dadosUsuario.email,
            senha: hash,
            nome: dadosUsuario.nome || null
        })
        return usuarioCriado
    }

    async atualizarUsuario(idUsuario: number, dadosParaAtualizar: Omit<Usuario, 'id'>) {

        if (dadosParaAtualizar.senha) {

            const hash = await createHash(dadosParaAtualizar.senha);

            dadosParaAtualizar.senha = hash;
        }

        const usuarioAtualizado = await this.repository.atualizarUsuario(idUsuario, dadosParaAtualizar);

        return usuarioAtualizado;
    }

    async deletarUsuario(idUsuario: number) {
        const usuario = await this.repository.deletarUsuario(idUsuario)
        return usuario
    }

}

export const userService = new UserService(userRepository)