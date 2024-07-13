import { Hono } from "hono";
import { verify } from "hono/jwt";
import { getDBInstance } from "../db/util";

/**
 * 
 * Introducing Thoughts. User can write a thought. Thoughts are short form. Think of 1 Thought like a Twitter post or Threads post.
 * 
 * thoughtRouter.post
thoughtRouter.put
thoughtRouter.get: 1 and all
thoughtRouter.delete
 */
export const thoughtRouter = new Hono<{
    Bindings: {
        DATABASE_URL: string;
        JWT_SECRET: string;
    };
    Variables: {
        userId: string;
    };
}>();


//get all thoughts of a user
thoughtRouter.get("/all/:userId", async (c) => {
    try {
        const prisma = getDBInstance(c)
        const userId = await c.req.param("userId");
        const thoughts = await prisma.thought.findMany({
            where: {
                authorId: userId,
            },
            select:{
                authorId:true,
                content:true,
                id:true,
                published:true,
                publishedDate:true,
                author:{
                    select:{
                        name:true
                    }
                }
            
            }
        });

        return c.json({
            thoughts: thoughts
        });
    } catch (e) {
        c.status(411);
        return c.json({
            message: "Error while fetching thoughts",
            error: e,
        });
    }

})

//get a thought of a user
thoughtRouter.get("/:thoughtId", async (c) => {
    try {
        const prisma = getDBInstance(c)
        const thoughtId = c.req.param("thoughtId");
        const thought = await prisma.thought.findFirst({
            where: {
                id: thoughtId,
            },
            select:{
                authorId:true,
                content:true,
                id:true,
                published:true,
                publishedDate:true,
                author:{
                    select:{
                        name:true
                    }
                }
                

            }
        });

        return c.json({
            thought: thought
        });
    } catch (e) {
        c.status(411);
        return c.json({
            message: "Error while fetching thought",
            error: e,
        });
    }

})

//protect all the routes below this
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
            return c.json({ error: "Unauthorized " });
        }
    } catch (e) {
        c.status(403);
        return c.json({
            error: "Credentials failed",
        });
    }
});

//create thought
thoughtRouter.post("/create", async (c) => {
    try {
        const prisma = getDBInstance(c)
        const userId = c.get("userId");
        const body = await c.req.json();
        const { content } = body;
        if (!content) {
            c.status(400);
            return c.json({
                message: "Content is required",
            });
        }
        const thought = await prisma.thought.create({
            data: {
                authorId: userId,
                content: content,
            },
        });

        return c.json({
            id: thought.id
        });
    } catch (e) {
        c.status(403);
        return c.json({ error: "Something went wrong ", stackTrace: e });
    }
})

//update thought
thoughtRouter.put("/update", async (c) => {
    try {
        const prisma = getDBInstance(c)
        const body = await c.req.json();
        const { id, content } = body;
        if (!content || !id ) {
            c.status(400);
            return c.json({
                message: "Please provide all required values",
            });
        }
        const thought = await prisma.thought.update({
            where: {
                id: id,
            },
            data: {
                content: content,
            },
        });

        return c.json({
            id: thought.id
        });
    } catch (e) {
        c.status(403);
        return c.json({ error: "Something went wrong ", stackTrace: e });
    }
})

//to delete a thought
thoughtRouter.delete("/:thoughtId", async (c) => {
    try {
        const prisma = getDBInstance(c)
        const thoughtId = c.req.param("thoughtId");
        await prisma.thought.delete({
            where: {
                id: thoughtId,
            },
        });

        return c.json({
            message: "Thought deleted successfully",
        });
    } catch (e) {
        c.status(411);
        return c.json({
            message: "Error while deleting post",
        });
    }
})