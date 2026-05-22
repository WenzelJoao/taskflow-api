import type { PrismaClient, Usuario } from "../../../prisma/generated/prisma/client";
import { prisma } from "../../../prisma/prisma";


export class UserRepository {
    constructor(private readonly prisma: PrismaClient) {
        this.prisma = prisma;
    }

    async listarTodosUsuarios() {
        const usuario = await this.prisma.usuario.findMany()
        return usuario
    }

    async buscarUsuarioId(idUsurio: number) {
        const usuario = await this.prisma.usuario.findUnique({
            where: {
                id: idUsurio
            }
        })
        return usuario
    }

    async buscarPorEmail(email: string) {

        return await this.prisma.usuario.findUnique({
            where: {
                email
            }
        });
    }

    async criarUsuario(dadosUsuario: Partial<Usuario>) {
        return await this.prisma.usuario.create({
            data: {
                email: dadosUsuario.email || "",
                senha: dadosUsuario.senha || "",
                nome: dadosUsuario.nome || ""
            }
        })
    }

    async atualizarUsuario(idUsurio: number, dadosParaAtualizar: Omit<Usuario, 'id'>) {
        const usuarioAtualizado = await this.prisma.usuario.update({
            data: {
                ...dadosParaAtualizar
            },
            where: {
                id: idUsurio
            }
        })
        return usuarioAtualizado
    }

    async deletarUsuario(idUsurio: number) {
        const usuario = await this.prisma.usuario.delete({
            where: {
                id: idUsurio
            }
        })
        return usuario
    }
}

export const userRepository = new UserRepository(prisma)

