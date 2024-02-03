import { Controller, Res, Get, Post, Body, Route, Header, Tags, TsoaResponse } from "tsoa";
import { UserCreateInput, UserCredentials, UserOutput } from "../../types/user";
import { authenticateUserService, createUserService, getCurrentUserService } from "../services/auth-services";
import {
	authenticateUserValidations,
	createUserValidations,
	getCurrentUserValidations,
} from "../validations/auth-validations";

@Tags("Authentication service")
@Route("authentication")
export class AuthenticationController extends Controller {
	@Get("current_user")
	public async getCurrentUser(@Header() authorization: string): Promise<UserOutput | null> {
		console.log(authorization);
		return getCurrentUserService(authorization);
	}
	@Post("login")
	public async logIn(
		@Body() credentials: UserCredentials,
		@Res() unauthorizedCallback: TsoaResponse<403, { reason: string }>,
	): Promise<{ token: string } | string> {
		await authenticateUserValidations(credentials, unauthorizedCallback);
		return authenticateUserService(credentials);
	}
	@Post("create_user")
	public async postUser(
		@Body() user_record: UserCreateInput,
		@Res() unauthorizedCallback: TsoaResponse<403, { reason: string }>,
	): Promise<UserOutput> {
		await createUserValidations(user_record, unauthorizedCallback);
		return createUserService(user_record);
	}
}
