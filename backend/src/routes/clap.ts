import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { Hono } from "hono";
import { verify } from "hono/jwt";
const MAX_CLAPS = 10;
export const clapRouter = new Hono<{
	Bindings: {
		DATABASE_URL: string;
		JWT_SECRET: string;
	};
	Variables: {
		userId: string;
	};
}>();

clapRouter.use("/*", async (c, next) => {
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

clapRouter.get("/:postId", async (c) => {
	const prisma = new PrismaClient({
		datasourceUrl: c.env.DATABASE_URL,
	}).$extends(withAccelerate());

	const header = c.req.header("authorization") || "";
	const token = header.split(" ")[1];
	const user = await verify(token, c.env.JWT_SECRET);
	const postId = await c.req.param("postId");
	if (!user) {
		c.status(403);
		return c.json({ error: "Unauthorized " });
	}

	const userId = user.id;
	try {
		const claps = await prisma.clap.findMany({
			where: { userId: userId, postId: postId }
		});
		return c.json({
			claps: claps.length,
			message: "All posts bookmarked by user",
		});
	} catch (ex) {
		return c.status(403);
	}
});

clapRouter.post("/", async (c) => {
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
		const claps = await prisma.clap.findMany({
			where: { userId: userId, postId: blogId }
		});
		if (claps.length < MAX_CLAPS) {
			const clap = await prisma.clap.create({
				data: {
					userId,
					postId: blogId,
				},
			});
			return c.json({
				id: clap.id,
			});
		}
	} catch (ex) {
		console.log("ERROR ", ex);
		c.status(500);
		return c.json({ error: "Something went wrong " });
	}
});
