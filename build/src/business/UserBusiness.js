"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserBusiness = void 0;
const CustomErrror_1 = require("../models/CustomErrror");
class UserBusiness {
    constructor(userData, idGenerate, hashManager, tokenManager) {
        this.userData = userData;
        this.idGenerate = idGenerate;
        this.hashManager = hashManager;
        this.tokenManager = tokenManager;
        this.signup = (name, email, password) => __awaiter(this, void 0, void 0, function* () {
            try {
                if (!name)
                    throw new CustomErrror_1.CustomError(400, "Enter a name");
                if (name.length < 2)
                    throw new CustomErrror_1.CustomError(400, "The name must to be longer then 2 character");
                if (!email)
                    throw new CustomErrror_1.CustomError(400, "Enter an email");
                if (!password)
                    throw new CustomErrror_1.CustomError(400, "Enter a password");
                if (password.length < 6)
                    throw new CustomErrror_1.CustomError(400, "Enter a password longer than 5 character");
                const verifyEmail = yield this.userData.getUserByEmail(email);
                if (verifyEmail)
                    throw new CustomErrror_1.CustomError(409, "Email alredy exist");
                const id = this.idGenerate.generate();
                const hashPassword = yield this.hashManager.generate(password);
                const token = this.tokenManager.generate({ id: id });
                yield this.userData.signup(id, name, email, hashPassword);
                return token;
            }
            catch (error) {
                if (error instanceof CustomErrror_1.CustomError) {
                    throw new CustomErrror_1.CustomError(error.statusCode, error.message);
                }
                else {
                    throw new Error(error.message);
                }
            }
        });
        this.login = (email, password) => __awaiter(this, void 0, void 0, function* () {
            try {
                if (!email)
                    throw new CustomErrror_1.CustomError(400, "Enter an email");
                if (!password)
                    throw new CustomErrror_1.CustomError(400, "Enter a password");
                const user = yield this.userData.getUserByEmail(email);
                if (!user)
                    throw new CustomErrror_1.CustomError(409, "User not found");
                const verifyPassword = yield this.hashManager.compare(password, user.password);
                if (!verifyPassword)
                    throw new CustomErrror_1.CustomError(409, "Incorrect password");
                const token = this.tokenManager.generate({ id: user.id });
                return token;
            }
            catch (error) {
                if (error instanceof CustomErrror_1.CustomError) {
                    throw new CustomErrror_1.CustomError(error.statusCode, error.message);
                }
                else {
                    throw new Error(error.message);
                }
            }
        });
    }
}
exports.UserBusiness = UserBusiness;
//# sourceMappingURL=UserBusiness.js.map