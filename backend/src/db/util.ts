import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";

export const getDBInstance = (config: any) => {
	// A new DB connection is intentionally created because we are using Serverless cloud in the backend.
	// The Prisma connection pool takes care of mulitple connections, so dont be worried about this anti-design implementation. It's intended to be like this.
	const prisma = new PrismaClient({
		datasourceUrl: config.env.DATABASE_URL,
	}).$extends(withAccelerate());
	return prisma;
};