import express from 'express';
import cors from "cors";
import { authRouter } from './modules/auth/routes/Auth';
import { userRouter } from './modules/users/routes/user';


const app = express()
app.use(express.json())
app.use(cors())
const port = 3000;

app.get('/', (req, res) => {
    console.log(req)
    res.send("Hello word");
})

app.use(authRouter)
app.use(userRouter)


app.listen(port, () => {
    console.log("Servidor está de pé :)");
})