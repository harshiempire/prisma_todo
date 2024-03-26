import express, { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
const app = express();
const port = "3000";

app.get("/", (req: Request, res: Response) => {
  res.send("hi");
});

app.get("/signup",async(req: Request, res: Response) => {
   const result = await prisma.user.findFirst({
    where:{
        
    }
   })
});

app.listen(port, () => {
  console.log(`listening to the port ${port}`);
});
