import { UserBusiness } from "../business/UserBusiness";
import { CustomError } from "../models/CustomErrror";
import { Request, Response } from "express";

export class UserController {
  constructor(private userBusiness: UserBusiness) {}

  signup = async (req: Request, res: Response) => {
    try {
      const { name, email, password } = req.body;

      const result = await this.userBusiness.signup(name, email, password);

      res.status(201).send(result);
    } catch (error: any) {
      if (error instanceof CustomError) {
        res.status(error.statusCode).send(error.message);
      } else {
        res.status(404).send(error.message);
      }
    }
  };

  login = async (req: Request, res: Response) => {
    try {
        const { email, password } = req.body;

        const login = await this.userBusiness.login(email, password);

        res.status(200).send(login);
    } catch (error: any) {
        if (error instanceof CustomError) {
            res.status(error.statusCode).send(error.message);
        } else {
            res.status(404).send(error.message);
        }
    }
};

}
