import { Router } from "express";
import { userController } from "../controllers/UserController";

export const userRouter = Router()

userRouter.get('/usuarios', async(_, res) => {
    return userController.listarTodosUsuarios(_, res)
})

userRouter.get('/usuarios/:id', async (req, res) => {
    return userController.buscarUsuarioId(req, res)
})

userRouter.post('/usuarios', async (req, res) =>{
    return userController.criarUsuario
})

userRouter.put('/usuarios/:id', async (req, res) => {
    return userController.atualizarUsuario
})

userRouter.delete('/usuarios/:id', async (req, res) => {
    return userController.deletarUsuario
})