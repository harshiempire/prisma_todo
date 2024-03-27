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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const client_1 = require("@prisma/client");
const zod_1 = require("zod");
const index_1 = require("./index");
const cors_1 = __importDefault(require("cors"));
const prisma = new client_1.PrismaClient();
const app = (0, express_1.default)();
const port = "3000";
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.get("/", (req, res) => {
    res.send("hi");
});
const signUpZod = zod_1.z.object({
    email: zod_1.z.string().email(),
    firstname: zod_1.z.string(),
    lastname: zod_1.z.string(),
    password: zod_1.z.string(),
});
/**
 * Handles the user signup process.
 *
 * This endpoint receives user signup data, validates it, and attempts to create a new user.
 * It responds with a success message or an error if the user cannot be created.
 *
 * @param {Request} req - The request object, containing the user's signup information.
 * @param {Response} res - The response object used to send back the HTTP response.
 */
app.post("/signup", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // Log the request body to the console for debugging purposes.
    console.log(req.body);
    // Validate the request body using the signUpZod schema.
    const { success, error } = signUpZod.safeParse(req.body); // Remember to keep the names correct in postman
    console.log(success, error);
    // If validation fails, respond with an error message.
    if (!success) {
        res.status(411).json({
            message: "Email already taken / Incorrect inputs",
        });
    }
    else {
        try {
            // Attempt to insert the new user into the database.
            const result = yield (0, index_1.insertUser)({
                username: req.body.email,
                firstName: req.body.firstname,
                lastName: req.body.lastname,
                password: req.body.password,
            });
            // If successful, respond with a success message.
            res.status(200).json({
                message: "User Created",
            });
        }
        catch (err) {
            // Log any errors to the console for debugging purposes.
            console.log(err);
            // If an error occurs (e.g., email already taken), respond with an error message.
            res.status(411).json({
                message: "Email already taken / Incorrect inputs",
            });
        }
    }
}));
const signInZod = zod_1.z.object({
    email: zod_1.z.string().email(),
    password: zod_1.z.string(),
});
app.post("/signin", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { success } = signInZod.safeParse(req.body);
    if (!success) {
        res.status(411).json({
            message: "Incorrect inputs",
        });
    }
    try {
        const result = yield prisma.user.findUnique({
            where: {
                email: req.body.email,
            },
        });
        console.log("this is from signin", req.body.password, result === null || result === void 0 ? void 0 : result.password);
        if (result && req.body.password === result.password)
            return res.status(200).json({
                message: "User Logged in",
            });
        else {
            return res.status(411).json({
                message: "Incorrect inputs",
            });
        }
    }
    catch (err) {
        console.log(err);
        res.status(411).json({
            message: "Incorrect inputs",
        });
    }
}));
app.get("/get", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // console.log("before call");
    const result = yield (0, index_1.getUser)();
    // console.log("after call");
    res.json({
        result,
    });
}));
app.post("/addtodos", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const todos = yield prisma.todo.create({
            data: {
                title: req.body.title,
                description: req.body.description,
                userId: req.body.userId,
            },
        });
        console.log(todos);
        return res.json({
            todos,
        });
    }
    catch (err) {
        console.log(err);
        return res.json({
            message: "Cannot add/Check the id",
        });
    }
}));
app.get("/gettodos", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield prisma.todo.findMany({
            where: {
                userId: req.body.userId,
            },
        });
        return res.json({
            result,
        });
    }
    catch (err) {
        console.log(err);
        return res.json({
            message: "Cannot get/Check the id",
        });
    }
}));
app.listen(port, () => {
    console.log(`listening to the port ${port}`);
});
