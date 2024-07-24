import { Hono } from "hono";
import { getDBInstance } from "../db/util";

export const statsRouter = new Hono<{
  Bindings: {
    DATABASE_URL: string;
    JWT_SECRET: string;
  };
  Variables: {
    userId: string;
  };
}>();

statsRouter.get("/", async (c) => {
  try {
    const prisma = getDBInstance(c);

    const userCount = await prisma.user.count();

    const blogCount = await prisma.post.count();

    // Get Contributors Count 
    const contributorsCount = await prisma.user.count({
      where: {
        posts: {
          some: {}, // This checks for users with at least one post
        },
      },
    });

    // Get Top Users 
    const topUsers = await prisma.user.findMany({
      orderBy: {
        subscribers: {
          _count: 'desc',
        },
      },
      take: 5,
      include: {
        _count: {
          select: { subscribers: true },
        },
      },
    });

    // Get Top Posts 
    const topPosts = await prisma.post.findMany({
      orderBy: {
        claps: {
          _count: 'desc',
        },
      },
      take: 5,
      include: {
        _count: {
          select: { claps: true },
        },
      },
    });

    // Get Top Tags 
    const topTags = await prisma.tag.findMany({
      orderBy: {
        tagsOnPost: {
          _count: 'desc',
        },
      },
      take: 5,
      include: {
        _count: {
          select: { tagsOnPost: true },
        },
      },
    });

    // Creates array with month and number of blogs
    const postByMonth: any[] = await prisma.$queryRaw`
      SELECT 
        TO_CHAR("publishedDate", 'YYYY-MM') AS month,
        COUNT(*) AS post_count
      FROM 
        "Post"
      GROUP BY 
        month
      ORDER BY 
        month;
    `;

    // For parsing BigInts
    const safeData = {
      userCount: userCount.toString(),
      blogCount: blogCount.toString(),
      contributorsCount: contributorsCount.toString(),
      topUsers: topUsers.map(user => ({
        ...user,
        _count: {
          subscribers: user._count.subscribers.toString(),
        },
      })),
      topPosts: topPosts.map(post => ({
        ...post,
        _count: {
          claps: post._count.claps.toString(),
        },
      })),
      topTags: topTags.map(tag => ({
        ...tag,
        _count: {
          tagsOnPost: tag._count.tagsOnPost.toString(),
        },
      })),
      postByMonth: postByMonth.map(row => ({
        month: row.month,
        post_count: row.post_count.toString(),
      })),
    };

    return c.json(safeData);

  } catch (error: any) {
    console.error("Error fetching stats:", error);
    c.status(403);
    return c.json({
      error: error.message || "An error occurred",
    });
  }
});
