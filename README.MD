# Stack

- React in the frontend
- Cloudflare workers in the backend
- zod as the validation library, type inference for the frontend types
- Typescript as the language
- Prisma as the ORM, with connection pooling
- Postgres as the database
- jwt for authentication

# Application structure

- backend
- common
- frontend

# How to setup locally

## Backend
- cd backend
- Add Postgres DATABASE_URL in .env
- Add Prisma connection pool DATABASE_URL in wrangler.toml file
- Add JWT Secret JWT_SECRET in wrangler.toml file
- npm install
- npm run dev 

## Frontend
- cd frontend
- npm install
- npm run dev 

# Technologies & Libraries
- Serverless Backend using [Cloudfare](https://www.cloudflare.com/)
- Postgres DB using [Aiven.io](aiven.io)
- Prisma as an ORM [Prisma](prisma.io)
- [Hono](https://hono.dev/) - Hono - [炎] means flame🔥 in Japanese - is a small, simple, and ultrafast web framework for the Edges. It works on any JavaScript runtime: Cloudflare Workers, Fastly Compute, Deno, Bun, Vercel, Netlify, AWS Lambda, Lambda@Edge, and Node.js.
- [Zod](https://zod.dev) - TypeScript-first schema validation with static type inference

# Deployments

- More on this available in backend/commands.md and frontend/commands.md

