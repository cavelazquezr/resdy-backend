import { Controller, Res, Get, Post, Put, Body, Path, Route, Header, Tags, TsoaResponse } from "tsoa";
import { UserCreateInput, UserUpdateInput, UserCredentials, UserRecord, UserOutput } from "../../types/user";
import {
	authenticateUserService,
	createUserService,
	getCurrentUserService,
	updateUserInfo,
} from "../services/auth-services";
import {
	authenticateUserValidations,
	createUserValidations,
	updateUserValidations,
} from "../validations/auth-validations";
import { handleRequest } from "../../utils/handleRequest";
import { CatchErrorDetails } from "../../utils/handleCatchError";

@Tags("Authentication service")
@Route("authentication")
export class AuthenticationController extends Controller {
	@Get("current_user")
	public async getCurrentUser(@Header() authorization: string): Promise<UserRecord | null | CatchErrorDetails> {
		return handleRequest<UserRecord | null>(this, async () => {
			return getCurrentUserService(authorization);
		});
	}
	@Post("login")
	public async logIn(@Body() credentials: UserCredentials): Promise<{ token: string } | CatchErrorDetails> {
		return handleRequest<{ token: string }>(this, async () => {
			await authenticateUserValidations(credentials);
			return authenticateUserService(credentials);
		});
	}
	@Post("create_user")
	public async postUser(@Body() user_record: UserCreateInput): Promise<UserOutput | CatchErrorDetails> {
		return handleRequest<UserOutput>(this, async () => {
			await createUserValidations(user_record);
			return createUserService(user_record);
		});
	}

	@Put() public async updateUser(
		@Header() authorization: string,
		@Body() payload: UserUpdateInput,
	): Promise<UserOutput | CatchErrorDetails> {
		return handleRequest<UserOutput>(this, async () => {
			await updateUserValidations(authorization, payload);
			return await updateUserInfo(authorization, payload);
		});
	}
}
