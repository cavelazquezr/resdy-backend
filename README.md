<img src="https://resdy-dev.s3.eu-west-1.amazonaws.com/assets/resdy-logo-white.png" height="50">


# Resdy Backend

Welcome to Resdy, a powerful RESTful API built with Prisma ORM, Node.js, TSOA, and TypeScript. This API serves as a robust backend for our application, providing seamless data management and powerful endpoint interactions. With TypeScript's typing and TSOA's automatic routing, this project ensures a scalable and maintainable codebase.

## VSCode Extensions needed

 - ESLint ([Download](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint))
 - Prisma ([Download](https://marketplace.visualstudio.com/items?itemName=Prisma.prisma))
 - Prettier ([Download](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode))



## Environment Variables

To run this project, you will need to add the following environment variables to your .env file

`DATABASE_URL`

Tu run this locally you must set the environment variable with this value:

`DATABASE_URL="postgresql://postgres:postgres@localhost:8001/resdy"`


## Documentations

 - [Prisma](https://www.prisma.io/docs)
 - [TSOA](https://tsoa-community.github.io/docs/)


## Installation

To set up this API for the first time, you have to follow these steps:

 1. Install dependencies:
 
	 `npm install`

 2. Ensure that you have Docker installed on your computer. Once you have it, run this command in the terminal and you should have your container built.

	 `npm run setupDb`

 3. Run the migration command to keep your database in sync with the Prisma Schema (Located in *prisma/schema.prisma*)

	 `npx prisma migrate dev`

 4. Seed your database with this command:

	 `npm run seed`

 5. Once all it configured. You can start using the API locally by running:

	 `npm run dev`

You can look up all routes by going to http://localhost:8080/docs/
## Contributors

<!-- ALL-CONTRIBUTORS-LIST:START - Do not remove or modify this section -->
<!-- prettier-ignore-start -->
<!-- markdownlint-disable -->

<!-- markdownlint-restore -->
<!-- prettier-ignore-end -->

<!-- ALL-CONTRIBUTORS-LIST:END -->