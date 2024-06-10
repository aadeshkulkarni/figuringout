import { Hono } from "hono";
import { verify } from "hono/jwt";
import { getDBInstance } from "../db/util";

export const commentRouter = new Hono<{
  Bindings: {
    DATABASE_URL: string;
    JWT_SECRET: string;
  };
  Variables: {
    userId: string;
  };
}>();


// Get comments for a post(unprotected)
commentRouter.get("/post/:postId", async (c) => {
  try {
    const prisma = getDBInstance(c);
    const postId = c.req.param("postId");
    const page = parseInt(c.req.query("page") || "1");
    const pageSize = parseInt(c.req.query("pageSize") || "10");

    const comments = await prisma.comment.findMany({
      where: { postId: postId, parentId: null }, // only top-level comments
      include: {
        user: { select: { id: true, name: true, profilePic: true } },
        children: {
          include: {
            user: { select: { id: true, name: true, profilePic: true } },
            claps: { select: { id: true } },
          },
        },
        claps: { select: { id: true } },
      },
      orderBy: { createdAt: "desc" },
      skip: (page - 1) * pageSize,
      take: pageSize,
    });

    const totalCount = await prisma.comment.count({
      where: { postId: postId, parentId: null },
    });

    return c.json({
      comments,
      totalPages: Math.ceil(totalCount / pageSize),
      currentPage: page,
    });
  } catch (e) {
    c.status(500);
    return c.json({ error: "Failed to fetch comments" });
  }
});

// Middleware for authentication
commentRouter.use("/*", async (c, next) => {
  try {
    const header = c.req.header("authorization") || "";
    const token = header.split(" ")[1];
    const user = await verify(token, c.env.JWT_SECRET);
    if (user && typeof user.id === "string") {
      c.set("userId", user.id);
      return next();
    } else {
      c.status(403);
      return c.json({ error: "Unauthorized" });
    }
  } catch (e) {
    c.status(403);
    return c.json({ error: "Credentials failed" });
  }
});

// Create a comment
commentRouter.post("/", async (c) => {
  const prisma = getDBInstance(c);
  const body = await c.req.json();
  const userId = c.get("userId");

  try {
    const comment = await prisma.comment.create({
      data: {
        message: body.message,
        userId: userId,
        postId: body.postId,
        parentId: body.parentId, // optional, for nested comments
      },
      include: {
        user: { select: { id: true, name: true, profilePic: true } },
      },
    });
    if(comment.message.length === 0 ){
        return c.json({message: "No comments Yet"});
    }
    return c.json(comment);
  } catch (ex) {
    c.status(500);
    return c.json({ error: "Failed to create comment" });
  }
});
// Update a comment
commentRouter.put("/:id", async (c) => {
  const prisma = getDBInstance(c);
  const commentId = c.req.param("id");
  const body = await c.req.json();
  const userId = c.get("userId");

  try {
    const comment = await prisma.comment.findUnique({
      where: { id: commentId },
      select: { userId: true },
    });

    if (comment?.userId !== userId) {
      c.status(403);
      return c.json({ error: "Unauthorized" });
    }

    const updatedComment = await prisma.comment.update({
      where: { id: commentId },
      data: { message: body.message },
    });

    return c.json(updatedComment);
  } catch (ex) {
    c.status(500);
    return c.json({ error: "Failed to update comment" });
  }
});

// Delete a comment
commentRouter.delete("/:id", async (c) => {
  const prisma = getDBInstance(c);
  const commentId = c.req.param("id");
  const userId = c.get("userId");

  try {
    const comment = await prisma.comment.findUnique({
      where: { id: commentId },
      select: { userId: true },
    });

    if (comment?.userId !== userId) {
      c.status(403);
      return c.json({ error: "Unauthorized" });
    }

    await prisma.comment.delete({ where: { id: commentId } });

    return c.json({ message: "Comment deleted successfully" });
  } catch (ex) {
    c.status(500);
    return c.json({ error: "Failed to delete comment" });
  }
});

// Toggle clap on a comment
commentRouter.post("/:id/clap", async (c) => {
  const prisma = getDBInstance(c);
  const commentId = c.req.param("id");
  const userId = c.get("userId");

  try {
    // First, fetch the comment to get its postId
    const comment = await prisma.comment.findUnique({
      where: { id: commentId },
      select: { postId: true },
    });

    if (!comment) {
      c.status(404);
      return c.json({ error: "Comment not found" });
    }

    const existingClap = await prisma.clap.findFirst({
      where: { userId, commentId },
    });

    if (existingClap) {
      await prisma.clap.delete({ where: { id: existingClap.id } });
      return c.json({ message: "Clap removed" });
    } else {
      const clap = await prisma.clap.create({
        data: { 
          userId, 
          commentId, 
          postId: comment.postId // Use the postId from the comment
        },
      });
      return c.json(clap);
    }
  } catch (ex) {
    console.error("Error toggling clap:", ex);
    c.status(500);
    return c.json({ error: "An unexpected error occurred while toggling the clap" });
  }
});

export default commentRouter;