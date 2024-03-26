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
exports.getUser = exports.updateUser = exports.insertUser = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
function insertUser(_a) {
    return __awaiter(this, arguments, void 0, function* ({ username, password, firstName, lastName, }) {
        const res = yield prisma.user.create({
            data: {
                email: username,
                firstname: firstName,
                lastname: lastName,
                password: password,
            },
        });
        return res;
    });
}
exports.insertUser = insertUser;
function updateUser(username_1, _a) {
    return __awaiter(this, arguments, void 0, function* (username, { firstName, lastName }) {
        const res = yield prisma.user.update({
            where: { email: username },
            data: {
                firstname: firstName,
                lastname: lastName,
            },
        });
        console.log(res);
    });
}
exports.updateUser = updateUser;
function getUser() {
    return __awaiter(this, void 0, void 0, function* () {
        const res = yield prisma.user.findMany();
        console.log(res);
        return res;
    });
}
exports.getUser = getUser;
