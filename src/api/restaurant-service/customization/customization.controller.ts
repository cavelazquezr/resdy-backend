import { Prisma, Customization } from "@prisma/client";
import { Header, Controller, Res, Body, Put, Route, Tags, TsoaResponse } from "tsoa";
import { putCustomizationHandler } from "./customization.model.put";

@Tags("Restaurant service")
@Route("restautant/customization")
export class CustomizationController extends Controller {
	//Endpoint a desarrollar 😁
	@Put()
	public async putCustomization(
		@Header() authorization: string,
		@Body() customization: Prisma.CustomizationCreateManyInput,
		@Res() unauthorizedCallback: TsoaResponse<403, { reason: string }>,
	): Promise<Customization | string> {
		return putCustomizationHandler(authorization, customization, unauthorizedCallback);
	}
}
