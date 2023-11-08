import { HashManager } from "./../services/HashManager";
import { UserData } from "../data/UserData";
import { CustomError } from "../models/CustomErrror";
import { IdGenerate } from "../services/IdGenerate";
import { User } from "@prisma/client";
import { TokenManager } from "../services/TokenManager";

export class UserBusiness {
  constructor(
    private userData: UserData,
    private idGenerate: IdGenerate,
    private hashManager: HashManager,
    private tokenManager: TokenManager
  ) {}

  signup = async (name: string, email: string, password: string) => {
    try {
      if (!name) throw new CustomError(400, "Enter a name");
      if (name.length < 2)
        throw new CustomError(400, "The name must to be longer then 2 character");

      if (!email) throw new CustomError(400, "Enter an email");

      if (!password) throw new CustomError(400, "Enter a password");

      if (password.length < 6)
        throw new CustomError(400, "Enter a password longer than 5 character");

      const verifyEmail: User | null = await this.userData.getUserByEmail(email);

      if (verifyEmail) throw new CustomError(409, "Email alredy exist");

      const id = this.idGenerate.generate();

      const hashPassword = await this.hashManager.generate(password);
      const token = this.tokenManager.generate({ id: id });

      await this.userData.signup(id, name, email, hashPassword);

      return token;
    } catch (error: any) {
      if (error instanceof CustomError) {
        throw new CustomError(error.statusCode, error.message);
      } else {
        throw new Error(error.message);
      }
    }
  };

  login = async (email: string, password: string) => {
    try {
      if (!email) throw new CustomError(400, "Enter an email");

      if (!password) throw new CustomError(400, "Enter a password");

      const user: User | null = await this.userData.getUserByEmail(email);

      if (!user) throw new CustomError(409, "User not found");

      const verifyPassword = await this.hashManager.compare(password, user.password);

      if (!verifyPassword) throw new CustomError(409, "Incorrect password");

      const token = this.tokenManager.generate({ id: user.id });

      console.log(token);
      

      return token; 
      
    } catch (error: any) {
      if (error instanceof CustomError) {
        throw new CustomError(error.statusCode, error.message);
      } else {
        throw new Error(error.message);
      }
    }
  };
}
