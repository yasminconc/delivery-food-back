import express, { Router } from "express";
import { UserController } from "../controller/UserController";
import { UserBusiness } from "../business/UserBusiness";
import { UserData } from "../data/UserData";
import { IdGenerate } from "../services/IdGenerate";
import { HashManager } from "../services/HashManager";
import { TokenManager } from "../services/TokenManager";

const userBusiness: UserBusiness = new UserBusiness(
  new UserData(),
  new IdGenerate(),
  new HashManager(),
  new TokenManager()
);
const userController: UserController = new UserController(userBusiness);

export const userRouter: Router = express.Router();

//Routes

userRouter.post("/signup", userController.signup);
userRouter.post("/login", userController.login)
