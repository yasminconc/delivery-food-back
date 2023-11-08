import express, { Express } from "express";
import cors from "cors";
import { userRouter } from "./router/UserRouter";

const app: Express = express();

const port: Number = 3000;

app.use(express.json());
app.use(cors());

const server = app.listen(port, () => {
  if (server) {
    console.log("O servidor está rodando no localhost:3000");
  } else {
    console.log("Erro ao rodar o servidor");
  }
});


app.use(userRouter)