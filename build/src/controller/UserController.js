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
exports.UserController = void 0;
const CustomErrror_1 = require("../models/CustomErrror");
class UserController {
    constructor(userBusiness) {
        this.userBusiness = userBusiness;
        this.signup = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const { name, email, password } = req.body;
                yield this.userBusiness.signup(name, email, password);
                res.status(201).send("User succesfully created");
            }
            catch (error) {
                if (error instanceof CustomErrror_1.CustomError) {
                    res.status(error.statusCode).send(error.message);
                }
                else {
                    res.status(404).send(error.message);
                }
            }
        });
        this.login = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const { email, password } = req.body;
                yield this.userBusiness.login(email, password);
                res.status(201).send("User loged in!");
            }
            catch (error) {
                if (error instanceof CustomErrror_1.CustomError) {
                    res.status(error.statusCode).send(error.message);
                }
                else {
                    res.status(404).send(error.message);
                }
            }
        });
    }
}
exports.UserController = UserController;
//# sourceMappingURL=UserController.js.map