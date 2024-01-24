import { Prisma, RestaurantInformation } from "@prisma/client";
import { Header, Controller, Res, Body, Put, Route, Tags, Delete, TsoaResponse } from "tsoa";
import { putInformationHandler } from "./information.model.put";

@Tags("Restaurant service")
@Route("Restaurant/information")
export class InformationController extends Controller {
	//Endpoint a desarrollar 😁
	@Put()
	public async putInformation(
		@Header() authorization: string,
		@Body() information: Prisma.RestaurantInformationCreateManyInput,
		@Res() unauthorizedCallback: TsoaResponse<403, { reason: string }>,
	): Promise<RestaurantInformation | string> {
		return putInformationHandler(authorization, information, unauthorizedCallback);
	}
}
