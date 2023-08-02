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
import { putInformationHandler } from "./information.model.put";


@Tags("Webs module")
@Route("webs/information")
export class InformationController extends Controller {

	//Endpoint a desarrollar 😁
	@Put()
	public async putInformation() {
		return putInformationHandler();
	}
}
