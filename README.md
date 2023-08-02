# Resdy Backend

Welcome to Resdy, a powerful RESTful API built with Prisma ORM, Node.js, TSOA, and TypeScript. This API serves as a robust backend for our application, providing seamless data management and powerful endpoint interactions. With TypeScript's typing and TSOA's automatic routing, this project ensures a scalable and maintainable codebase.

## Documentation

 - Prisma ORM ([Go to docs](https://www.prisma.io/docs))
 - TSOA ([Go to docs](https://tsoa-community.github.io/docs/))

## Once you got the repo cloned

To setup this API for first time, you have to follow these steps:

 1. Install dependencies:
 
	 `npm install`

 2. Ensure that you have Docker installed in your computer. Once you have it, run this comand in the terminal and you should have your container built.

	 `npm run setupDb`

 3. Run the migration command to keep your database in sync with the Prisma Schema (Located in *prisma/schema.prisma*)

	 `npx prisma migrate dev`

 4. Seed your database with this command:

	 `npm run seed`

And you will be ready to work!
