import { Prisma, User } from "@prisma/client";
import {
	Header,
	Controller,
	Res,
	Get,
	Post,
	Body,
	Put,
	Query,
	Route,
	Tags,
	Delete,
	TsoaResponse,
} from "tsoa";
import { getUsersHandler } from "./users.model.get";
import { postUserHandler } from "./users.model.post";
import { putUserHandler } from "./users.model.put";
import { deleteUserHandler } from "./users.model.delete";
import { UpdateUser } from "../../types/users";

@Tags("Users module")
@Route("users")
export class UsersController extends Controller {
	@Get()
	public async getUsers(
		@Query() lastname?: string,
		@Query() firstname?: string,
		@Query() email?: string,
	): Promise<User[] | string> {
		return getUsersHandler({
			lastname,
			firstname,
			email,
		});
	}

	@Post()
	public async postUser(@Body() user: Prisma.UserCreateInput): Promise<User> {
		return postUserHandler(user);
	}

	@Put()
	public async putUser(
		@Header() authorization: string,
		@Body() user: UpdateUser,
		@Res() unauthorizedCallback: TsoaResponse<403, { reason: string }>,
	): Promise<User | string> {
		return putUserHandler(authorization, user, unauthorizedCallback);
	}

	@Delete()
	public async deleteUser(
		@Header() authorization: string,
		@Query() id: string,
		@Res() unauthorizedCallback: TsoaResponse<403, { reason: string }>,
	): Promise<User | string> {
		return deleteUserHandler(authorization, id, unauthorizedCallback);
	}
}
