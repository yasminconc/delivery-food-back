"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TokenManager = void 0;
const jwt = __importStar(require("jsonwebtoken"));
const CustomErrror_1 = require("../models/CustomErrror");
class TokenManager {
    constructor() {
        this.generate = (id) => {
            return jwt.sign(id, process.env.TOKEN_SECRET_KEY, {
                expiresIn: process.env.TOKEN_EXPIRES_IN,
            });
        };
        this.getTokenData = (token) => {
            try {
                return jwt.verify(token, process.env.TOKEN_SECRET_KEY);
            }
            catch (error) {
                if (error.name === "TokenExpiredErrror") {
                    throw new CustomErrror_1.CustomError(409, "Expired token, log in again");
                }
                else if (error.name === "JsonWebTokenError") {
                    throw new CustomErrror_1.CustomError(409, "Expired token, log in again");
                }
                else {
                    throw new CustomErrror_1.CustomError(404, "Unknow validation error, log in again");
                }
            }
        };
    }
}
exports.TokenManager = TokenManager;
//# sourceMappingURL=TokenManager.js.map