import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { Hono } from "hono";
import { verify } from "hono/jwt";

export const bookmarkRouter = new Hono<{
  Bindings: {
    DATABASE_URL: string;
    JWT_SECRET: string;
  };
  Variables: {
    userId: string;
  };
}>();

bookmarkRouter.use("/*", async (c, next) => {
  try {
    const header = c.req.header("authorization") || "";
    const token = header.split(" ")[1];
    const user = await verify(token, c.env.JWT_SECRET);
    if (user) {
      c.set("userId", user.id);
      return next();
    } else {
      c.status(403);
      return c.json({ error: "Unauthorized " });
    }
  } catch (e) {
    c.status(403);
    return c.json({
      error: "Credentials failed",
    });
  }
});

bookmarkRouter.get("/", async (c) => {
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

bookmarkRouter.post("/", async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());
  const body = await c.req.json();
  const userId = c.get("userId");
  const blogId = body.blogId;
  if (!userId || !blogId) {
    c.status(400);
    return c.json({
      message: "Inputs incorrect",
    });
  }

  try {
    const bookmark = await prisma.bookmark.create({
      data: {
        userId,
        postId: blogId,
      },
    });
    return c.json({
      id: bookmark.id,
    });
  } catch (ex) {
    console.log("ERROR ", ex);
    c.status(500);
    return c.json({ error: "Something went wrong " });
  }
});

bookmarkRouter.delete("/:id", async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());
  const userId = c.get("userId");
  const bookmarkId = await c.req.param("id");
  if (!userId || !bookmarkId) {
    c.status(400);
    return c.json({
      message: "Inputs incorrect",
    });
  }

  try {
    const bookmark = await prisma.bookmark.delete({
      where: {
        id: bookmarkId,
      },
    });
    return c.json({
      id: bookmark.id,
    });
  } catch (ex) {
    console.log("ERROR ", ex);
    c.status(500);
    return c.json({ error: "Something went wrong " });
  }
});
