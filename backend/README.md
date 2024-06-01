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


### Cloudfare R2 (CDN for Image uploads)

On Development mode, You have only 1 option:
1. Disable Image upload feature (frontend/config.ts > FF_IMAGE_UPLOADS = false)

Setup Cloudfare R2 [Production mode guide]

- Create a cloudfare account (dash.cloudfare.com)
- From the dashboard > R2 > Use the free version (Card details, if required)
- From backend, Login to Wrangler like this
```bash
npx wrangler login
```
- To check your cloudfare profile / access details: (optional)
```bash
npx wrangler whoami
```
- To check existing buckets in your R2: (optional)
```bash
npx wrangler r2 bucket list
```
- To create a bucket:
```bash
npx wrangler r2 bucket create [bucket-name]
```
- Enable R2.dev Subdomain from the Cloudfare dashboard.
- Update Wrangler.toml file with bucket details, subdomain urls, etc.