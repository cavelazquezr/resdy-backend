import { Controller, Res, Post, Body, Route, Tags, TsoaResponse } from "tsoa";
import { UserCredentials } from "../../types/users";
import { authenticateUserHandler } from "./auth.model.post";

@Tags("Authentication module")
@Route("authentication")
export class AuthenticationController extends Controller {
	@Post()
	public async logIn(
		@Body() credentials: UserCredentials,
		@Res() unauthorizedCallback: TsoaResponse<403, { reason: string }>,
	): Promise<{ token: string } | string> {
		return authenticateUserHandler(credentials, unauthorizedCallback);
	}
}
