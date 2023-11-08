"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.IdGenerate = void 0;
const uuid_1 = require("uuid");
class IdGenerate {
    constructor() {
        this.generate = () => (0, uuid_1.v4)();
    }
}
exports.IdGenerate = IdGenerate;
//# sourceMappingURL=IdGenerate.js.map