import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { Hono } from "hono";
import { sign, verify } from "hono/jwt";
import { getDBInstance } from "../db/util";

export const tagRouter = new Hono<{
	Bindings: {
		DATABASE_URL: string;
		JWT_SECRET: string;
		OPENAI_API_KEY: string;
	};
	Variables: {
		userId: string;
	};
}>();

tagRouter.get("/", async (c) => {
	try {
		const prisma = getDBInstance(c);

		let query: any = {
			select: {
				id: true,
				tagName: true
			}
		};
		const tags = await prisma.tag.findMany(query);
		return c.json({
			tags: tags,
		});
	} catch (e) {
		console.log(e);
		c.status(411);
		return c.json({
			message: "Something went wrong while fetching tags.",
		});
	}
});

tagRouter.get("/recommended", async (c) => {
	try {
		const prisma = getDBInstance(c);

		const topTags = await prisma.tagsOnPost.groupBy({
			by: ["tagId"],
			_count: {
				postId: true
			}, 
			orderBy: {
				_count: {
					postId: 'desc',
				}
			},
			take: 5
		});

		const topFiveTagsIds = topTags.map((t) => t.tagId)
		const topfiveTags = await prisma.tag.findMany({
			where: {
				id: {
					in: topFiveTagsIds
				}
			}
		});
		return c.json({
			topfiveTags
		});
	} catch (error) {
		console.log(error)
		c.status(411);
		return c.json({
			message: "Something went wrong while fetching tags."
		});
	}
});

tagRouter.use("/*", async (c, next) => {
	try {
		const header = c.req.header("authorization") || "";
		const token = header && header.split(" ")[1];
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

tagRouter.post("/link", async (c) => {
	try {
		const prisma = getDBInstance(c);
		const body = await c.req.json();
		const { postId, tags } = body;

		if (tags.length > 0 && postId) {
			let tagPromises: any[] = [];
			tags.forEach((tagId: string) => {
				const p = prisma.tagsOnPost.create({
					data: {
						postId: postId,
						tagId: tagId,
					},
				});
				tagPromises.push(p);
			});
			const result = await Promise.all(tagPromises);
			console.log("Result: ", result);
			c.status(200);
			return c.json({ message: "Topics linked successfully." });
		}
		return c.json({ message: "Nothing to link here" });
	} catch (e) {
		c.status(403);
		return c.json({
			message: "Something went wrong while assigning tags.",
		});
	}
});