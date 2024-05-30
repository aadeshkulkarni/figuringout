import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { Hono } from "hono";
import { verify } from "hono/jwt";

export const subscriberRouter = new Hono<{
  Bindings: {
    DATABASE_URL: string;
    JWT_SECRET: string;
  };
  Variables: {
    userId: string;
  };
}>();

subscriberRouter.use("/*", async (c, next) => {
  try {
    const header = c.req.header("authorization") || "";
    const token = header && header.split(" ")[1];
    const user = await verify(token, c.env.JWT_SECRET);
    if (user) {
      c.set("userId", user.id);
      return next();
    } else {
      c.status(403);
      return c.json({ error: "Unauthorized" });
    }
  } catch (e) {
    c.status(403);
    return c.json({
      error: "Credentials failed",
    });
  }
});

subscriberRouter.post("/subscribe", async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  const { userId, subscriberId } = await c.req.json();
  
  try {
    await prisma.subscriber.create({
      data: {
        userId,
        subscriberId,
      },
    });
    return c.json({
      message: "Subscribed successfully",
    });
  } catch (ex) {
    c.status(403)
    return c.json({
      error: "Subscription failed",
    });
  }
});

subscriberRouter.post("/unsubscribe", async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  const { userId, subscriberId } = await c.req.json();

  try {
    await prisma.subscriber.deleteMany({
      where: {
        userId,
        subscriberId,
      },
    });
    return c.json({
      message: "Unsubscribed successfully",
    });
  } catch (ex) {
    c.status(403)
    return c.json({
      error: "Unsubscription failed",
    });
  }
});

subscriberRouter.get("/:userId", async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());
  const userId = c.req.param("userId");

  try {
    const subscribers = await prisma.subscriber.findMany({
      where: {
        userId,
      },
      include: {
        subscriber: true,
      },
    });
    return c.json({
      subscribers: subscribers.map((sub) => sub.subscriber),
    });
  } catch (ex) {
    c.status(403)
    return c.json({
      error: "Failed to fetch subscribers",
    });
  }
});
