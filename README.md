# Short-Me

This project is a URL shortener with QR code generation. It allows users to shorten long URLs and generate a QR code for easy sharing and scanning. Built with the T3 Stack, it leverages technologies like Next.js, NextAuth.js, Prisma, Tailwind CSS, tRPC, Turso and shadcn. This project is bootstrapped with `create-t3-app`, providing a solid foundation for further development and deployment.

## Why I Made This

I created this project as part of my final year project for my degree and to gain proficiency in the technologies I've used, both within and outside of my studies. As a culmination of my academic journey and personal interest, this project allowed me to apply the knowledge and skills I've acquired throughout my studies and beyond. This project represents not only a personal accomplishment but also a testament to my dedication to continuous learning and growth in the field of Full-Stack Web Development.

## Why Open Source

I decided to make this project open source because I've learned so much throughout its development journey, and I hope that by sharing it, others can benefit in the same way. I believe in the power of community-driven development and the collective wisdom it brings. Let's build something great together!

## Built With
- [T3 Stack](https://create.t3.gg/)
- [Next.js](https://nextjs.org)
- [NextAuth.js](https://next-auth.js.org)
- [Prisma](https://prisma.io)
- [Tailwind CSS](https://tailwindcss.com)
- [tRPC](https://trpc.io)
- [Turso](https://turso.tech/)
- [shadcn](https://ui.shadcn.com/)

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
## License

This project is licensed under the GNU AFFERO GENERAL PUBLIC LICENSE - see the [LICENSE.md](https://github.com/mnlade/short-me/blob/main/LICENSE.md) file for details

