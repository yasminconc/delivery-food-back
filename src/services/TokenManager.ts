import { AuthenticationData } from "../models/AuthenticationData";
import * as jwt from "jsonwebtoken";
import { CustomError } from "../models/CustomErrror";

export class TokenManager {
  generate = (id: AuthenticationData) => {
    return jwt.sign(id, process.env.TOKEN_SECRET_KEY as jwt.Secret, {
      expiresIn: process.env.TOKEN_EXPIRES_IN,
    });
  };

  getTokenData = (token: string): AuthenticationData => {
    try {
      return jwt.verify(token, process.env.TOKEN_SECRET_KEY as jwt.Secret) as AuthenticationData;
    } catch (error: any) {
      if (error.name === "TokenExpiredErrror") {
        throw new CustomError(409, "Expired token, log in again");
      } else if (error.name === "JsonWebTokenError") {
        throw new CustomError(409, "Expired token, log in again");
      } else {
        throw new CustomError(404, "Unknow validation error, log in again");
      }
    }
  };
}
