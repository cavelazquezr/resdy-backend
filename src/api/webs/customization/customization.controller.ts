import { Prisma, Web } from "@prisma/client";
import {
	Header,
	Controller,
	Res,
	Body,
	Put,
	Route,
	Tags,
	Delete,
	TsoaResponse,
} from "tsoa";
import { putCustomizationHandler } from "./customization.model.put";

@Tags("Webs module")
@Route("webs/customization")
export class CustomizationController extends Controller {

	//Endpoint a desarrollar 😁
	@Put()
	public async putCustomization() {
		return putCustomizationHandler();
	}
}
