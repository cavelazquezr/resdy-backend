import { Prisma, Web } from "@prisma/client";
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
import { getWebsHandler } from "./webs.model.get";
import { postWebHandler } from "./webs.model.post";
import { deleteWebHandler } from "./webs.model.delete";
import { putWebHandler } from "./webs.model.put";
import { WebOutput } from "../../types/webs";

@Tags("Webs module")
@Route("webs")
export class WebsController extends Controller {
	@Get()
	public async getWebs(
		@Res() unauthorizedCallback: TsoaResponse<403, { reason: string }>,
		@Query() name?: string,
		@Query() city?: string,
		@Query() restautantType?: string,
		@Query() country?: string,
	): Promise<WebOutput[] | string> {
		return getWebsHandler(unauthorizedCallback, name, city, restautantType, country);
	}

	@Post()
	public async postWeb(
		@Header() authorization: string,
		@Body() web: Prisma.WebCreateWithoutAdminInput,
		@Res() unauthorizedCallback: TsoaResponse<403, { reason: string }>,
	): Promise<Web | string> {
		return postWebHandler(authorization, web, unauthorizedCallback);
	}

	//Endpoint a desarrollar 😁
	@Put()
	public async putWeb() {
		return putWebHandler();
	}

	//Endpoint a desarrollar 😁
	@Delete()
	public async deleteWeb() {
		return deleteWebHandler();
	}
}
