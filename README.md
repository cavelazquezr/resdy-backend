# Resdy Backend

Welcome to Resdy, a powerful RESTful API built with Prisma ORM, Node.js, TSOA, and TypeScript. This API serves as a robust backend for our application, providing seamless data management and powerful endpoint interactions. With TypeScript's typing and TSOA's automatic routing, this project ensures a scalable and maintainable codebase.

## Documentation

 - Prisma ORM ([Go to docs](https://www.prisma.io/docs))
 - TSOA ([Go to docs](https://tsoa-community.github.io/docs/))

## VSCode Extensions needed

 - ESLint ([Download](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint))
 - Prisma ([Download](https://marketplace.visualstudio.com/items?itemName=Prisma.prisma))
 - Prettier ([Download](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode))

## Once you got the repo cloned

To set up this API for the first time, you have to follow these steps:

 1. Install dependencies:
 
	 `npm install`

 2. Ensure that you have Docker installed on your computer. Once you have it, run this command in the terminal and you should have your container built.

	 `npm run setupDb`

 3. Run the migration command to keep your database in sync with the Prisma Schema (Located in *prisma/schema.prisma*)

	 `npx prisma migrate dev`

 4. Seed your database with this command:

	 `npm run seed`

And you will be ready to work!
