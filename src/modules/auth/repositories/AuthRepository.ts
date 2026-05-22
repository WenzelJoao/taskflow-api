import type { PrismaClient, Token, Usuario } from "../../../prisma/generated/prisma/client";
import { prisma } from "../../../prisma/prisma";

export class AuthRepository {
    constructor(private readonly prisma: PrismaClient) {
        this.prisma = prisma
    }
    async cadastrar(dadosUsuario: Partial<Usuario>) {
        return await this.prisma.usuario.create({
            data: {
                email: dadosUsuario.email || "",
                senha: dadosUsuario.senha || "",
                nome: dadosUsuario.nome || ""
            }
        })
    }

    async existeUsuario(email: string) {
        return await this.prisma.usuario.findUnique({
            where: {
                email: email
            }
        })
    }

    async editar(id: number, dadosUsuario: Partial<Usuario>) {

        return await this.prisma.usuario.update({
            where: {
                id
            },
            data: dadosUsuario
        });
    }

    async criarToken(dadosToken: Omit<Token, "id" | "revogado">) {
        return await this.prisma.token.create({
            data: dadosToken
        })
    }

}


export const authRepository = new AuthRepository(prisma)