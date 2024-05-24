import { createBlogInput, updateBlogInput } from "@aadeshk/medium-common";
import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { Hono } from "hono";
import { verify } from "hono/jwt";
import { getFormattedDate } from "../utils";

export const blogRouter = new Hono<{
  Bindings: {
    DATABASE_URL: string;
    JWT_SECRET: string;
  };
  Variables: {
    userId: string;
  };
}>();

/* 
This route should be kept above app.use("/*") middleware as it is unprotected
*/
// TODO: add pagination
blogRouter.get("/bulk", async (c) => {
  try {
    const prisma = new PrismaClient({
      datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate());
    const posts = await prisma.post.findMany({
      select: {
        content: true,
        title: true,
        id: true,
        publishedDate: true,
        author: {
          select: {
            name: true,
          },
        },
        published: true,
      },
    });
    return c.json({
      posts: posts,
    });
  } catch (e) {
    console.log(e);
    c.status(411);
    return c.json({
      message: "Error while fetching post",
    });
  }
});

blogRouter.use("/*", async (c, next) => {
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

blogRouter.post("/", async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());
  const body = await c.req.json();
  const { success } = createBlogInput.safeParse(body);
  if (!success) {
    c.status(411);
    return c.json({
      message: "Inputs incorrect",
    });
  }
  const authorId = c.get("userId");
  try {
    const post = await prisma.post.create({
      data: {
        title: body.title,
        content: body.content,
        authorId: authorId,
        publishedDate: getFormattedDate(),
      },
    });
    return c.json({
      id: post.id,
    });
  } catch (ex) {
    c.status(403);
    return c.json({ error: "Something went wrong " });
  }
});

blogRouter.put("/", async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());
  const body = await c.req.json();
  const { success } = updateBlogInput.safeParse(body);
  if (!success) {
    c.status(411);
    return c.json({
      message: "Inputs incorrect",
    });
  }
  try {
    const post = await prisma.post.update({
      where: {
        id: body.id,
      },
      data: {
        title: body.title,
        content: body.content,
        publishedDate: getFormattedDate(),
      },
    });
    return c.json({
      id: post.id,
    });
  } catch (ex) {
    c.status(403);
    return c.json({ error: "Something went wrong " });
  }
});

blogRouter.get("/:id", async (c) => {
  try {
    const prisma = new PrismaClient({
      datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate());
    const postId = await c.req.param("id");
    const userId = c.get("userId");
    const post = await prisma.post.findFirst({
      where: {
        id: postId,
      },
      select: {
        title: true,
        content: true,
        publishedDate: true,
        author: {
          select: {
            name: true,
            id: true,
          },
        },
        id: true,
        bookmarks: {
          select: {
            id: true,
            user: {
              select: {
                id: true,
              },
            },
          },
        },
        claps: {
          select: {
            id: true
          }
        }
      },
    });

    const userBookmarkId = post?.bookmarks.find(
      (bookmark) => bookmark.user.id === userId
    );

    return c.json({
      post: {
        ...post,
        bookmarkId: userBookmarkId?.id,
      },
    });
  } catch (e) {
    console.log(e);
    c.status(411);
    return c.json({
      message: "Error while fetching post",
    });
  }
});

blogRouter.delete("/:id", async (c) => {
  try {
    const prisma = new PrismaClient({
      datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate());
    const postId = await c.req.param("id");
    const post = await prisma.post.delete({
      where: {
        id: postId,
      },
    });
    return c.json({
      message: "Post deleted successfully",
    });
  } catch (e) {
    console.log(e);
    c.status(411);
    return c.json({
      message: "Error while deleting post",
    });
  }
});