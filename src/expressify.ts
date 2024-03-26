import express, { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import { z } from "zod";
  import { insertUser, updateUser, getUser } from "./index";

const prisma = new PrismaClient();
const app = express();
const port = "3000";
app.use(express.json());

app.get("/", (req: Request, res: Response) => {
  res.send("hi");
});

const signUpZod = z.object({
  email: z.string().email(),
  firstname: z.string(),
  lastname: z.string(),
  password: z.string(),
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
app.post("/signup", async (req: Request, res: Response) => {
  // Log the request body to the console for debugging purposes.
  console.log(req.body);

  // Validate the request body using the signUpZod schema.
  const { success } = signUpZod.safeParse(req.body);

  // If validation fails, respond with an error message.
  if (!success) {
    res.status(411).json({
      message: "Email already taken / Incorrect inputs",
    });
  } else {
    try {
      // Attempt to insert the new user into the database.
      const result = await insertUser({
        username: req.body.email,
        firstName: req.body.firstname,
        lastName: req.body.lastname,
        password: req.body.password,
      });

      // If successful, respond with a success message.
      res.status(200).json({
        message: "User Created",
      });
    } catch (err) {
      // Log any errors to the console for debugging purposes.
      console.log(err);

      // If an error occurs (e.g., email already taken), respond with an error message.
      res.status(411).json({
        message: "Email already taken / Incorrect inputs",
      });
    }
  }
});

const signInZod = z.object({
  email: z.string().email(),
  password: z.string(),
});

app.post("/signin", async (req: Request, res: Response) => {
  const { success } = signInZod.safeParse(req.body);
  if (!success) {
    res.status(411).json({
      message: "Incorrect inputs",
    });
  }
  try {
    const result = await prisma.user.findUnique({
      where: {
        email: req.body.email,
      },
    });
    console.log("this is from signin", req.body.password, result?.password);
    if (result && req.body.password === result.password)
      return res.status(200).json({
        message: "User Logged in",
      });
    else {
      return res.status(411).json({
        message: "Incorrect inputs",
      });
    }
  } catch (err) {
    console.log(err);
    res.status(411).json({
      message: "Incorrect inputs",
    });
  }
});

app.get("/get", async (req: Request, res: Response) => {
  // console.log("before call");
  const result = await getUser();
  // console.log("after call");
  res.json({
    result,
  });
});

app.listen(port, () => {
  console.log(`listening to the port ${port}`);
});
