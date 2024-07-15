<a name="readme-top"></a>
<!-- PROJECT SHIELDS -->
<!--
*** See the bottom of this document for the declaration of the reference variables
*** for contributors-url, forks-url, etc. This is an optional, concise syntax you may use.
*** https://www.markdownguide.org/basic-syntax/#reference-style-links
-->
[![Contributors][contributors-shield]][contributors-url]
[![Forks][forks-shield]][forks-url]
[![Stargazers][stars-shield]][stars-url]
[![Issues][issues-shield]][issues-url]
[![MIT License][license-shield]][license-url]
[![LinkedIn][linkedin-shield]][linkedin-url]


<!-- PROJECT LOGO -->
<br />
<div align="center">
  <a href="https://github.com/aadeshkulkarni/medium-app">
    <img src="frontend/public/logo.png" alt="Logo" width="80" height="80">
  </a>

  <h3 align="center">Figuringout.Life</h3>

  <p align="center">
    A Fullstack Javascript blog with Generative AI!
    <br />
    <a href="https://github.com/aadeshkulkarni/medium-app"><strong>Explore the docs »</strong></a>
    <br />
    <br />
    <a href="https://figuringout.life">View App</a>
    ·
    <a href="https://github.com/aadeshkulkarni/medium-app/issues/new?labels=bug&template=bug-report---.md">Report Bug</a>
    ·
    <a href="https://github.com/aadeshkulkarni/medium-app/issues/new?labels=enhancement&template=feature-request---.md">Request Feature</a>
  </p>
</div>

<!-- ABOUT THE PROJECT -->
## About The Project

[![Screenshot 2024-06-02 at 6 32 27 AM](https://ucarecdn.com/bb958f8f-63b3-4209-a1c4-c5a21ceed7af/cover.jpeg)](https://figuringout.life)

A React frontend and Cloudflare workers backend application offering features that replicate Medium, the popular blogging platform. 

Features:
* Token based Authentication.
* Create, Read, Update, Delete Blogs.
* Bookmark, Like, Search, Filter Blogs.
* Autosave blog while writing.
* User profiles.
* Topics.
* Subscribe profiles.
* Comment.

Unique Features:
* Generate Blog using AI.
* Chat with AI to deepen your understanding around a particular blog.
* Voice over for blogs, so you can listen to blogs while working out / having food.

<p align="right">(<a href="#readme-top">back to top</a>)</p>

## Technologies & Libraries

[![React][React.js]][React-url]
[![Cloudflare][CloudflareWorkers]][cloudflare-url]
[![Zod][Zod.js]][zod-url]
[![Typescript][Typescript.js]][typescript-url]
[![Prisma][Prisma]][prisma-url]
[![Postgres][PostgresDB]][postgres-url]

<p align="right">(<a href="#readme-top">back to top</a>)</p>

## Project Structure

- Backend: Contains server-side code and logic.
- Common: Shared assets and modules used by frontend and backend. (NPM Library)
- Frontend: Contains client-side code and logic.


## Local Setup

#### Backend

##### Pre-requisities:

- Create a copy of .env.example and name the file `.env`
- Set up Postgres DATABASE_URL in .env file. You can get a free PostgreSQL connection string from [Aiven.io](https://aiven.io/).
- Create a copy of wrangler.sample.toml and name the file `warngler.toml`
- Set up Prisma connection pool DATABASE_URL in wrangler.toml file. You can get this for free from [Prisma](https://www.prisma.io/data-platform/accelerate).
- Set up JWT Secret JWT_SECRET in wrangler.toml file. This can be any value.
- Login to ([cloudflare](https://www.cloudflare.com/)) and create a new R2 bucket. You probably need a Credit card for verfication.
- Allow Access for R2.dev subdomain for your R2 bucket from R2>settings.
- Replace Bucket-name and preview-your-bucket-name with your R2-bucket-name in wrangler.toml file.
- Replace R2_SUBDOMAIN_URL with your R2 subdomain URL in wrangler.toml file.

```bash 

cd backend
npm install
npm run prisma:migrate
npx prisma generate
npm run dev

```

> Note: wrangler.toml is the environment configuration file for a serverless backend. .env is used by Prisma for connection pooling. Ensure you configure both environment files accordingly.

#### Frontend

- Navigate into the frontend directory using 
```bash

cd frontend
npm install
npm run dev

```

> Note: `frontend/src/config.ts` contains `BACKEND_URL`. If you need your frontend to point to local backend server, uncomment `export const BACKEND_URL = "http://localhost:8787"`. 


#### Running Frontend and Backend Concurrently

To make the developer experience smoother, you can now run both the frontend and backend simultaneously using a single command from the project root.

##### Steps:

- Ensure you have project root folder. install packages with
   ```sh
   npm install
   ```
- Insall both frontend and backend pakages with
   ```sh
   npm install:all
   ```
- Now you can simply run:
   ```sh
   npm run dev
   ```
   This command will start both the frontend and backend servers simultaneously.

For additional customization options and detailed information, please refer to the [concurrently documentation](https://www.npmjs.com/package/concurrently).

#### AI based Article content generation

- set `FF_ENABLE_AI` = true in config.ts
- set `OPENAI_API_KEY` in wrangler.toml file in the backend. (https://platform.openai.com/api-keys)
- The feature is enabled only when title is atleast 10 characters long.


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

<!-- LICENSE -->
## License

Distributed under the MIT License. See `LICENSE.txt` for more information.

<p align="right">(<a href="#readme-top">back to top</a>)</p>


<!-- CONTACT -->
## Contact

Aadesh Kulkarni - aadeshkulkarni08@gmail.com

Project Link: [https://github.com/aadeshkulkarni/medium-app](https://github.com/aadeshkulkarni/medium-app)

Discord: [https://discord.gg/JtTQkzFY89](https://discord.gg/JtTQkzFY89)

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- MARKDOWN LINKS & IMAGES -->
<!-- https://www.markdownguide.org/basic-syntax/#reference-style-links -->
[contributors-shield]: https://img.shields.io/github/contributors/aadeshkulkarni/medium-app.svg?style=for-the-badge
[contributors-url]: https://github.com/aadeshkulkarni/medium-app/graphs/contributors
[forks-shield]: https://img.shields.io/github/forks/aadeshkulkarni/medium-app.svg?style=for-the-badge
[forks-url]: https://github.com/aadeshkulkarni/medium-app/network/members
[stars-shield]: https://img.shields.io/github/stars/aadeshkulkarni/medium-app.svg?style=for-the-badge
[stars-url]: https://github.com/aadeshkulkarni/medium-app/stargazers
[issues-shield]: https://img.shields.io/github/issues/aadeshkulkarni/medium-app.svg?style=for-the-badge
[issues-url]: https://github.com/aadeshkulkarni/medium-app/issues
[license-shield]: https://img.shields.io/github/license/aadeshkulkarni/medium-app.svg?style=for-the-badge
[license-url]: https://github.com/aadeshkulkarni/medium-app/blob/master/LICENSE.txt
[linkedin-shield]: https://img.shields.io/badge/-LinkedIn-black.svg?style=for-the-badge&logo=linkedin&colorB=555
[linkedin-url]: https://linkedin.com/in/aadeshkulkarni

[React.js]: https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB
[React-url]: https://reactjs.org/
[CloudflareWorkers]: https://img.shields.io/badge/Cloudflare-F38020?style=for-the-badge&logo=Cloudflare&logoColor=white
[cloudflare-url]: https://workers.cloudflare.com/
[Zod.js]: https://img.shields.io/badge/-Zod-3E67B1?style=for-the-badge&logo=zod&logoColor=white
[zod-url]: https://zod.dev
[Typescript.js]: https://shields.io/badge/TypeScript-3178C6?logo=TypeScript&logoColor=FFF&style=for-the-badge
[typescript-url]: https://www.typescriptlang.org/
[Prisma]: https://img.shields.io/badge/Prisma-3982CE?style=for-the-badge&logo=Prisma&logoColor=white
[prisma-url]: https://www.prisma.io/
[PostgresDB]: https://img.shields.io/badge/postgresql-4169e1?style=for-the-badge&logo=postgresql&logoColor=white
[postgres-url]: https://www.postgresql.org/




