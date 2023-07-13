## next-react-tailwind-todo

### Persistent storage

Persistent storage is done with Postgresql. Local dev-enviroment could be run with a docker image.

When running a docker image, make sure to set these enviroment variables:

```
POSTGRES_PASSWORD=[PASSWORD]
POSTGRES_USER=[USER]
```

Of course rename and set [PASSWORD] and [USER] to your liking.

Then, create an .env-file in the project-root and set DATABASE_URL like:
```
DATABASE_URL="postgresql://monty:pass@localhost:5432/next-react-tailwind-todo?schema=public"
```

Here you should set username and password to what you have setup in the docker image when starting that up. Also perhaps you would fancy another database name.

### Running Database Migrations

Open a terminal in the project root and run:

```
npx prisma migrate dev --name init
```