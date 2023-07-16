## next-react-tailwind-todo

### Authentication

This app uses Next-Auth with Google provider to authenticate a user and make a todolist personal. Login to
[Google Cloud Console](https://console.cloud.google.com/), create a new project and setup credientials like this ( when running in local dev ):

<img src="docs/create-oauth-client-id.png" title="Google Oauth credientials setup">

Next, setup the envoriment variables for the Google Oauth Client ID and Client Secret. Create or add to the .env-file:

```
GOOGLE_OAUTH_ID=[XXXXXXXXXX]
GOOGLE_OAUTH_SECRET=[YYYYYYYYYY]
```

( replace [XXXXXXXXXX] and [YYYYYYYYYY] from credientals-page in Google API's )

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
npx prisma migrate dev
```

In production you should run this command for migrations:

```
npx prisma migrate deploy
```

### Production

For NextJS Auth to work in a production-enviroment, make sure to set an enviroment variable for a secret:

```
NEXTAUTH_SECRET=[your_top_secret]
```

( or.. if you don't you will get an error while trying to login )