import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import * as dotenv from 'dotenv';
import { topics } from "../src/constants";
dotenv.config();

const prisma = new PrismaClient({
  datasourceUrl: process.env.PRISMA_DATABASE_URL ,
}).$extends(withAccelerate());

async function seedTags() {
	try {
		const promises: any[] = [];
		topics.forEach((topic, index) => {
			const p = prisma.tag.upsert({
				where: {
					id: index.toString(),
				},
				create: {
					id: index.toString(),
					tagName: topic,
				},
				update: {},
			});
			promises.push(p);
		});
		await Promise.all(promises);
	} catch (error) {
		console.error("Error seeding Tags:", error);
		throw error;
	}
}

async function seedDatabase() {
	try {
		await seedTags();
	} catch (error) {
		console.error("Error seeding database:", error);
		throw error;
	}
}

seedDatabase().catch((error) => {
	console.error("An unexpected error occurred during seeding:", error);
});