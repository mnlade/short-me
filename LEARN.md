# Learn to install in local

## Run in Local

1- Install dependencies using npm
```
npm install
```

2- Copy the .env.example to .env and update the variables.
```
cp .env.example .env
```

3- If you use windows you need to instal wsl to use turso
```
wsl --install
```

4- Into wsl run and 
```
turso auth --hedless
```

5- Copy into wsl terminal the export

6- Create turso db
```
turso db create your-database-name
```

7- Get turso db info
```
turso db show your-database-name
```

8- Copy url info and paste into TURSO_DATABASE_URL="libsql://...." in env

9- Get turso db tokens
```
turso db tokens create your-database-name
```

10- Copy url info and paste into TURSO_DATABASE_AUTH_TOKEN="" in env

11- Migrate the db wih prisma
```
npm prisma migrate dev --name init
```

12- Link turso with prisma migrate file
```
turso db shell your-database-name <./prisma/migration/migrationpath_init/migration.sql
```

13- Start the development server
```
pnpm run dev
```