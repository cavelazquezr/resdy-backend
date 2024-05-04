import express, { Application } from "express";
import openapi from "../tsoa/swagger.json";
import { RegisterRoutes } from "../tsoa/routes";
import swaggerUi from "swagger-ui-express";
import { middleware as openApiValidatorMiddleware } from "express-openapi-validator";
import bodyParser from "body-parser";
import cors from "cors";
import { PORT } from "./config";
import dotenv from "dotenv";

dotenv.config();

const app: Application = express();

//Basic middleware
app.use(bodyParser.urlencoded({ extended: true, limit: "50mb" }));
app.use(bodyParser.json({ limit: "50mb" }));

app.use(cors());

app.get("/", (_req, res) => {
	res.json({ msg: "Welcome to your Rest API" });
});

// Docs endpoints
app.get("/openapi", (_req, res) => res.send(openapi));
app.use(
	"/docs",
	swaggerUi.serve,
	swaggerUi.setup(openapi, {
		customCss: ".swagger-ui .topbar { display: none }",
		customSiteTitle: "resdy API",
		swaggerOptions: {
			defaultModelsExpandDepth: -1,
		},
	}),
);

// Register tsoa controllers
RegisterRoutes(app);

// Enforce validation
app.use(
	openApiValidatorMiddleware({
		apiSpec: "./tsoa/swagger.json",
		validateRequests: true,
		validateResponses: true,
	}),
);

//Basic middleware
app.listen(PORT, () => {
	console.log(`🚀 Server running at port ${PORT} 🚀`);
});
