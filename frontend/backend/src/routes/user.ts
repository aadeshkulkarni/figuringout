import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { Hono } from "hono";
import { sign } from "hono/jwt";
import { signinInput, signupInput } from "@aadeshk/medium-common";

export const userRouter = new Hono<{
  Bindings: {
    DATABASE_URL: string;
    JWT_SECRET: string;
  };
}>();

userRouter.post("/signup", async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  const body = await c.req.json();
  const { success } = signupInput.safeParse(body);
  if (!success) {
    c.status(411);
    return c.json({
      message: "Invalid email or password.",
    });
  }
  try {
    const user = await prisma.user.findFirst({
      where: {
        email: body.email,
      },
    });
    if (user) {
      c.status(409);
      return c.json({ error: "User with the email already exists" });
    }
    const newUser = await prisma.user.create({
      data: {
        email: body.email,
        password: body.password,
        name: body.name
      },
    });
    const token = await sign({ id: newUser.id }, c.env.JWT_SECRET);
    c.status(200);
    return c.json({
      message: "Sign up successful",
      jwt: token,
      user: {
        id: newUser.id,
        email: newUser.email,
        name: newUser.name
      }
    });
  } catch (ex) {
    return c.status(403);
  }
});

userRouter.post("/signin", async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  const body = await c.req.json();
  const { success } = signinInput.safeParse(body);
  if (!success) {
    c.status(411);
    return c.json({
      message: "Invalid email or password.",
    });
  }
  try {
    const email = await prisma.user.findUnique({
      where: {
        email: body.email,
      },
    });
    if (!email) {
      c.status(403);
      return c.json({ error: "Account with this email does not exist." });
    }
    const user = await prisma.user.findUnique({
      where: {
        email: body.email,
        password: body.password,
      },
    });
    if (!user) {
      c.status(403);
      return c.json({ error: "Email and Password Mismatch" });
    }

    const token = await sign({ id: user.id }, c.env.JWT_SECRET);
    return c.json({
      jwt: token,
      user: user,
      message: "Sign in successful",
    });
  } catch (ex) {
    return c.status(403);
  }
});

userRouter.get("/", async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  try {
    const users = await prisma.user.findMany();
    return c.json({
      payload: users,
      message: "All users",
    });
  } catch (ex) {
    return c.status(403);
  }
});
