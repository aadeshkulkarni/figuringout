### App setup (Local)

- Set up Postgres DATABASE_URL in .env. You can get a free PostgreSQL connection string from [Aiven.io](https://aiven.io/).
- Set up Prisma connection pool DATABASE_URL in wrangler.toml file. You can get this for free from [Prisma](https://www.prisma.io/data-platform/accelerate).

```bash
npm install
npx prisma generate --no-engine`
npm run dev
```

NOTE: If `npm install` takes too much time, Remove `"@cloudflare/workers-types": "^4.20240529.0",` from package.json and try again. You can then separately install using the command 
```bash 
npm install @cloudflare/workers-types
 ```

DB Seeding (optional)
```bash
npm run db:seed
```

DB Seeding (optional)
```bash
npm run db:seed
```

### Deployment 
```bash
npm run deploy
```
