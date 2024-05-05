import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { Hono } from "hono";
import { sign, verify } from "hono/jwt";
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
    await prisma.user.create({
      data: {
        email: body.email,
        password: body.password,
        name: body.name
      },
    });
    c.status(200);
    return c.json({
      message: "Sign up successful",
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
    const user = await prisma.user.findUnique({
      where: {
        email: body.email,
        password: body.password,
      },
    });
    if (!user) {
      c.status(403);
      return c.json({ error: "Account with this email & password does not exist." });
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

userRouter.get("/bookmarks", async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  const header = c.req.header("authorization") || "";
  const token = header.split(" ")[1];
  const user = await verify(token, c.env.JWT_SECRET);

  if (!user) {
    c.status(403);
    return c.json({ error: "Unauthorized " });
  }

  const userId = user.id;
  try {
    const bookmarks = await prisma.bookmark.findMany({
      where: { userId },
      include: {
        post: {
          select: {
            id: true,
            title: true,
            content: true,
            publishedDate: true,
            published: true,
            author: true,
          },
        },
      },
    });
    return c.json({
      payload: bookmarks.map((bookmark) => bookmark.post),
      message: "All posts bookmarked by user",
    });
  } catch (ex) {
    return c.status(403);
  }
});
