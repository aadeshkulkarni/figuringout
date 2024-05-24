# Blogging-app [Fullstack Javascript]

![blogging app](https://i.ibb.co/zxM16cs/Screenshot-2024-05-14-at-11-33-44-PM.png)

[Medium-app](https://medium-app-zeta.vercel.app/) is a React frontend and Cloudflare workers backend application offering features replicating Medium, the popular blogging platform. The application comes with JWT authentication, Postgres database, and various user features.

---

## ✨ Features

- Sign up and Sign in securely via token-based authentication.
- View all published articles.
- Create, Edit, and Delete articles.
- Link an article to a topic.
- View specific article.
- Bookmark an article (Save for later).
- Like an article.
- Search for articles.
- Filter articles based on topics.
- View & edit user profile.
- **Generate article content based on title using AI.**

#### In the pipeline: 

- Voiceover 
- Recommendation system

> (More features TBA)
---

## 🛠 Tech Stack

The application is built with the following technologies:

- [React](https://reactjs.org/) for the frontend.
- [Cloudflare Workers](https://workers.cloudflare.com/) for the serverless backend.
- [Zod](https://zod.dev) for validation library and TypeScript type inference.
- [TypeScript](https://www.typescriptlang.org/) as the main programming language.
- [Prisma](https://www.prisma.io/) with connection pooling as the ORM.
- [Postgres](https://www.postgresql.org/) as the database.
- [JSON Web Tokens (JWT)](https://jwt.io/) for authentication.

## 📁 Project Structure

The project is structured into the following directories:

- Backend: Contains server-side code and logic.
- Common: Shared assets and modules used by frontend and backend. (NPM Library)
- Frontend: Contains client-side code and logic.

---

## 💻 Local Setup

### Backend

- Navigate into the backend directory `cd backend`
- Set up Postgres DATABASE_URL in .env. You can get a free PostgreSQL connection string from [Aiven.io](https://aiven.io/).
- Set up Prisma connection pool DATABASE_URL in wrangler.toml file. You can get this for free from [Prisma](https://www.prisma.io/data-platform/accelerate).
- Set up JWT Secret JWT_SECRET in wrangler.toml file. This can be any value.
- Install dependencies using `npm install`
- Run the application locally using `npm run dev`

> Note: wrangler.toml is the environment configuration file for a serverless backend. .env is used by Prisma for connection pooling. Ensure you configure both environment files accordingly.

### Frontend

- Navigate into the frontend directory using `cd frontend`
- Install dependencies using `npm install`
- Run the application locally using `npm run dev`

---

### AI based Article content generation
- set `FF_ENABLE_AI` = true in config.ts
- set `OPENAI_API_KEY` in wrangler.toml file in the backend.
- The feature is enabled only when title is atleast 10 characters long.


### Docker-Setup

- For this setup complete all the Frontend, Backend process including the Postgres, Prisma connection pool and JWT secret
- Navigate to the root directory and run command `docker-compose up -d`, runs command in detached mode.
- At last Navigate to the url `http://localhost:80` for viewing the website.

---

## 🔧 Technologies & Libraries

- [ReactJS](https://react.dev/)
- [Typescript](https://www.typescriptlang.org/)
- [Cloudflare Workers - Serverless Backend](https://www.cloudflare.com/)
- [Aiven.io - PostgreSQL Database](https://www.aiven.io/)
- [Prisma - ORM](https://www.prisma.io/)
- [Hono](https://hono.dev/) - Small, simple, and ultra-fast web framework for the edges.
- [Zod](https://zod.dev/) - TypeScript-first schema validation with static type inference

---

## 🚀 Deployments

Refer `backend/commands.md` and `common/commands.md` in their respective directories.

## Contributing

We welcome contributions from the community! To contribute, follow these steps:

1. Fork the repository.
2. Create a new branch (`git checkout -b feature/[feature-title]`).
3. Make your changes and commit them (`git commit -am 'Add brief meaningful commit message'`).
4. Push to the branch (`git push origin feature/[feature-title]`).
5. Create a new Pull Request.

For major changes, please open an issue first to discuss what you would like to change.

Read our [contribution guidelines](./CONTRIBUTING.md) for more details.

## 🤝 Contributors

<a href="https://github.com/aadeshkulkarni/medium-app/graphs/contributors">
  <img src="https://contrib.rocks/image?repo=aadeshkulkarni/medium-app" />
</a>
