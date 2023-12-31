## Git repo

### Add remote to existing project

```shell
git remote add origin repo_url
git push -u -f origin main
```

## DB

### Docker

Launch a new container for mysql:

```bash
docker run --name mysql-dbname -e MYSQL_ROOT_PASSWORD=secret -p 3307:3307 -d mysql
```

Configure the `DATABASE_URL` in the `.env` file:

```Properties
DATABASE_URL="mysql://root:secret@127.0.0.1:3307/dbname"
```

## Shadcn config

### Font installation

Install the font as per shadcn [installation guide](https://ui.shadcn.com/docs/installation/next) (point 4). If the page router is still used, font installation has to be put in `pages/_app.tsx` file, as described [here](https://nextjs.org/docs/pages/building-your-application/optimizing/fonts#google-fonts)

### Manually add `@/components` folder to tailwind config

Add to `tailwind.config.ts` the path to `@/components` and `@/lib`

```ts
content: [
  ...,
  "@/components/**/*.{ts,tsx}",
  "@/lib/**/*.{ts,tsx}",
]
```
