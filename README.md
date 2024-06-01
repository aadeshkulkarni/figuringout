## Blogging + AI

![blogging app](https://i.ibb.co/zxM16cs/Screenshot-2024-05-14-at-11-33-44-PM.png)

A React frontend and Cloudflare workers backend application offering features that replicate Medium, the popular blogging platform. 

### Important links
- Application [link](https://medium-app-zeta.vercel.app/)
- Contributions [Open issues](https://github.com/aadeshkulkarni/medium-app/issues)

---

### 🛠 Technologies & Libraries

- [React](https://reactjs.org/) for the frontend.
- [Cloudflare Workers](https://workers.cloudflare.com/) for the serverless backend.
- [Zod](https://zod.dev) for validation library and TypeScript type inference.
- [TypeScript](https://www.typescriptlang.org/) as the main programming language.
- [Prisma](https://www.prisma.io/) with connection pooling as the ORM.
- [Postgres](https://www.postgresql.org/) as the database.
- [JSON Web Tokens (JWT)](https://jwt.io/) for authentication.

### 📁 Project Structure

- Backend: Contains server-side code and logic.
- Common: Shared assets and modules used by frontend and backend. (NPM Library)
- Frontend: Contains client-side code and logic.

---

### 💻 Local Setup

#### Backend

- Navigate into the backend directory 
```bash
cd backend
```
- Create a copy of .env.example and name the file `.env`
- Set up Postgres DATABASE_URL in .env file. You can get a free PostgreSQL connection string from [Aiven.io](https://aiven.io/).
- Set up Prisma connection pool DATABASE_URL in wrangler.toml file. You can get this for free from [Prisma](https://www.prisma.io/data-platform/accelerate).
- Set up JWT Secret JWT_SECRET in wrangler.toml file. This can be any value.
- Install dependencies using 
```bash 
npm install
```
- DB Migration (This will create the DB Schema)
```bash
npm run prisma:migrate
```
- DB Seeding - optional (Check package.json for details)
- Run the application locally using 
```bash
npm run dev
```

> Note: wrangler.toml is the environment configuration file for a serverless backend. .env is used by Prisma for connection pooling. Ensure you configure both environment files accordingly.

#### Frontend

- Navigate into the frontend directory using 
```bash
cd frontend
```
- Install dependencies using 
```bash
npm install
```
- Run the application locally using 
```bash
npm run dev
```

> Note: `frontend/src/config.ts` contains `BACKEND_URL`. If you need your frontend to point to local backend server, uncomment `export const BACKEND_URL = "http://localhost:8787"`. 
---

#### AI based Article content generation

- set `FF_ENABLE_AI` = true in config.ts
- set `OPENAI_API_KEY` in wrangler.toml file in the backend.
- The feature is enabled only when title is atleast 10 characters long.

---

### Contributing

We welcome contributions from the community! To contribute, follow these steps:

1. Fork the repository.
2. Create a new branch (`git checkout -b feature/[feature-title]`).
3. Make your changes and commit them (`git commit -am 'Add brief meaningful commit message'`).
4. Push to the branch (`git push origin feature/[feature-title]`).
5. Create a new Pull Request.

For major changes, please open an issue first to discuss what you would like to change.

Read our [contribution guidelines](./CONTRIBUTING.md) for more details.

### 🤝 Contributors

<a href="https://github.com/aadeshkulkarni/medium-app/graphs/contributors">
  <img src="https://contrib.rocks/image?repo=aadeshkulkarni/medium-app" />
</a>
