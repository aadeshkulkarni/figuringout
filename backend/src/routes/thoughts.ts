import { Hono } from "hono";
import { verify } from "hono/jwt";
import { getDBInstance } from "../db/util";

export const thoughtRouter = new Hono<{
  Bindings: {
    DATABASE_URL: string;
    JWT_SECRET: string;
  };
  Variables: {
    userId: string;
  };
}>();



// Middleware for authentication
thoughtRouter.use("/*", async (c, next) => {
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


  // Add a thought
  thoughtRouter.post("/", async (c) => {
    try {
      const prisma = getDBInstance(c);
      const userId = c.get("userId");
      const content = await c.req.json();
  
      // Log the received content
      console.log("Received content:", content);
      console.log("User ID:", userId);
  
  
      const thought = await prisma.thought.create({
        data: {
          content: content.thought,
          authorId: userId,
        },
      });
  
      return c.json({ success: true, thought });
    } catch (e: any) {
      console.error("Error creating thought:", e);
      c.status(500);
      return c.json({ error: e.message });
    }
  });
  

  // Delete a thought
thoughtRouter.delete("/:id", async (c) => {
    try {
      const prisma = getDBInstance(c);
      const userId = c.get("userId");
      const id = c.req.param("id");
  
      const thought = await prisma.thought.findFirst({
        where: {
          id,
          authorId: userId,
        },
      });
  
      if (!thought) {
        c.status(403);
        return c.json({ error: "Thought not found" });
      }
  
      await prisma.thought.delete({
        where: {
          id,
        },
      });
  
      return c.json({ success: true });
    } catch (e) {
      c.status(500);
      return c.json({ error: "Failed to delete thought" });
    }
  });

  // Update a thought
thoughtRouter.put("/:id", async (c) => {
    try {
      const prisma = getDBInstance(c);
      const userId = c.get("userId");
      const id = c.req.param("id");
      const content = await c.req.json();
      console.log("Received content:", content);
  
      const thought = await prisma.thought.findFirst({
        where: {
          id,
          authorId: userId,
        },
      });
  
      if (!thought) {
        c.status(403);
        return c.json({ error: "Thought not found" });
      }
  
      await prisma.thought.update({
        where: {
          id,
        },
        data: {
          content:content.newThought,
        },
      });
  
      return c.json({ success: true });
    } catch (e) {
      c.status(500);
      return c.json({ error: "Failed to update thought" });
    }
  });

    // Get all thoughts

thoughtRouter.get("/", async (c) => {
    try {
      const prisma = getDBInstance(c);
      const thoughts = await prisma.thought.findMany({
        include: {
            author: true,
        },
        });

        return c.json(thoughts);
    } catch (e) {
        c.status(500);
        return c.json({ error: "Failed to get thoughts" });
    }
}
);

// Get a thought by id
thoughtRouter.get("/:id", async (c) => {
    try {
      const prisma = getDBInstance(c);
      const id = c.req.param("id");
      const thought = await prisma.thought.findFirst({
        where: {
          id,
        },
        include: {
            author: true,
        },

        });

        if (!thought) {
            c.status(404);
            return c.json({ error: "Thought not found" });
        }

        return c.json(thought);
    } catch (e) {
        c.status(500);
        return c.json({ error: "Failed to get thought" });
    }
}
);

