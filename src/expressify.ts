import express, { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import { z } from "zod";

const prisma = new PrismaClient();
const app = express();
const port = "3000";

const signUpZod = z.object({
  email: z.string().email(),
  firstname: z.string(),
  lastname: z.string(),
  password: z.string(),
});

app.get("/", (req: Request, res: Response) => {
  res.send("hi");
});

app.get("/signup", async (req: Request, res: Response) => {
  const { success } = signUpZod.safeParse(req.body);
  if (!success) {
    res.status(411).json({
      message: "Email already taken / Incorrect inputs",
    });
  }
  try {
    const result = await prisma.user.create({
      data: {
        email: req.body.email,
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        password: req.body.password,
      },
    });
    console.log(result);
    res.status(200).json({
      message: "User Created",
    });
  } catch (err) {
    console.log(err);
    res.status(411).json({
      message: "Email already taken / Incorrect inputs",
    });
  }
});

app.listen(port, () => {
  console.log(`listening to the port ${port}`);
});
