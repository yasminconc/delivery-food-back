"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRouter = void 0;
const express_1 = __importDefault(require("express"));
const UserController_1 = require("../controller/UserController");
const UserBusiness_1 = require("../business/UserBusiness");
const UserData_1 = require("../data/UserData");
const IdGenerate_1 = require("../services/IdGenerate");
const HashManager_1 = require("../services/HashManager");
const TokenManager_1 = require("../services/TokenManager");
const userBusiness = new UserBusiness_1.UserBusiness(new UserData_1.UserData(), new IdGenerate_1.IdGenerate(), new HashManager_1.HashManager(), new TokenManager_1.TokenManager());
const userController = new UserController_1.UserController(userBusiness);
exports.userRouter = express_1.default.Router();
exports.userRouter.post("/signup", userController.signup);
exports.userRouter.get("/login", userController.login);
//# sourceMappingURL=UserRouter.js.map