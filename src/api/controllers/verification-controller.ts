import { Controller, Post, Route, Tags, Body } from "tsoa";
import { verifyIfEmailIsUsedValidations, verifyIfNameIsUsedValidations } from "../validations/verification-validation";

@Tags("Verification service")
@Route("verification")
export class VerificationController extends Controller {
	@Post("emailUsed")
	public async verifyIfEmailIsUsed(@Body() input: { email: string }): Promise<boolean> {
		await verifyIfEmailIsUsedValidations(input.email);
		return true;
	}
	@Post("restaurantNameUsed")
	public async verifyIfNameIsUsed(@Body() input: { name: string }): Promise<boolean> {
		await verifyIfNameIsUsedValidations(input.name);
		return true;
	}
}
