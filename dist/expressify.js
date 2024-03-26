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
const prisma = new client_1.PrismaClient();
const app = (0, express_1.default)();
const port = "3000";
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
app.post("/signup", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(req.body);
    const { success } = signUpZod.safeParse(req.body);
    if (!success) {
        res.status(411).json({
            message: "Email already taken / Incorrect inputs",
        });
    }
    try {
        const result = yield (0, index_1.insertUser)({
            username: req.body.email,
            firstName: req.body.firstname,
            lastName: req.body.lastname,
            password: req.body.password,
        });
        res.status(200).json({
            message: "User Created",
        });
    }
    catch (err) {
        console.log(err);
        res.status(411).json({
            message: "Email already taken / Incorrect inputs",
        });
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
app.listen(port, () => {
    console.log(`listening to the port ${port}`);
});
