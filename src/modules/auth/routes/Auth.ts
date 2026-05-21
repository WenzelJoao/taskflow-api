import { Router } from "express";
import { authController } from "../controllers/AuthController";
import { auth } from "../middleware/AuthMiddleware";

export const authRouter = Router();

authRouter.post("/cadastro", async (req, res) => {
    return authController.cadastrar(req, res)
})

authRouter.post("/login", async (req, res) => {
    return authController.logar(req, res)
})

authRouter.put("/perfil/:id", auth, async (req, res) => {
    return authController.editar(req, res);
}
);