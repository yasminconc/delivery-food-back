"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const UserRouter_1 = require("./router/UserRouter");
const app = (0, express_1.default)();
const port = 3000;
app.use(express_1.default.json());
app.use((0, cors_1.default)());
const server = app.listen(port, () => {
    if (server) {
        console.log("O servidor está rodando no localhost:3000");
    }
    else {
        console.log("Erro ao rodar o servidor");
    }
});
app.use(UserRouter_1.userRouter);
//# sourceMappingURL=index.js.map