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
/**
 * Asynchronously inserts a new user into the database.
 *
 * This function takes an object containing the user's username, password,
 * first name, and last name, and uses the Prisma ORM to create a new user
 * entry in the database. The `username` is stored as the user's email.
 *
 * @param {Object} userDetails - The details of the user to insert.
 * @param {string} userDetails.username - The username (email) of the user.
 * @param {string} userDetails.password - The password of the user.
 * @param {string} userDetails.firstName - The first name of the user.
 * @param {string} userDetails.lastName - The last name of the user.
 * @returns {Promise<Object>} A promise that resolves with the result of the user creation operation.
 */
function insertUser(_a) {
    return __awaiter(this, arguments, void 0, function* ({ username, password, firstName, lastName, }) {
        const res = yield prisma.user.create({
            data: {
                email: username, // User's email, derived from the username parameter
                firstname: firstName, // User's first name
                lastname: lastName, // User's last name
                password: password, // User's password (Note: Storing plain-text passwords is not recommended)
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
