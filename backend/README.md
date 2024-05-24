### App setup (Local)

- Set up Postgres DATABASE_URL in .env. You can get a free PostgreSQL connection string from [Aiven.io](https://aiven.io/).
- Set up Prisma connection pool DATABASE_URL in wrangler.toml file. You can get this for free from [Prisma](https://www.prisma.io/data-platform/accelerate).

```
npm install
npx prisma generate --no-engine`
npm run dev
```

DB Seeding (optional)
```
npm run db:seed
```

DB Seeding (optional)
```
npm run db:seed
```

### Deployment 
```
npm run deploy
```
