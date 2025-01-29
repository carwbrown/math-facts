# Happy Life

CRUD ToDo app

## Getting started

First, run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

## Styling and Components

- tailwind css
- Daisy UI

## Prisma

`npx prisma migrate dev --name init` - to sync schema changes
`npx tsx script.ts` - to run the seed script

`npx prisma studio` - runs and opens a prisma GUI running on `http://localhost:5555`

## DB local

- `brew services start --all` - to start
- `brew services kill --all` - to end

bah
