import { Controller, Res, Get, Post, Body, Route, Header, Tags, TsoaResponse } from "tsoa";
import { CreateUserInput, UserCredentials, UserOutput } from "../../types/user";
import { authenticateUserHandler, postUserHandler } from "./auth.model.post";
import { getCurrentUserHandler } from "./auth.model.get";

@Tags("Authentication service")
@Route("authentication")
export class AuthenticationController extends Controller {
	@Get("/current_user")
	public async getCurrentUser(
		@Header() authorization: string,
		@Res() unauthorizedCallback: TsoaResponse<403, { reason: string }>,
	): Promise<UserOutput | string> {
		return getCurrentUserHandler(authorization, unauthorizedCallback);
	}
	@Post("/login")
	public async logIn(
		@Body() credentials: UserCredentials,
		@Res() unauthorizedCallback: TsoaResponse<403, { reason: string }>,
	): Promise<{ token: string } | string> {
		return authenticateUserHandler(credentials, unauthorizedCallback);
	}
	@Post("create_user")
	public async postUser(
		@Body() user: CreateUserInput,
		@Res() unauthorizedCallback: TsoaResponse<403, { reason: string }>,
	): Promise<UserOutput> {
		return postUserHandler(user, unauthorizedCallback);
	}
}
