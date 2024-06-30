import { Controller, Post, Route, Tags, Body } from "tsoa";
import { handleRequest } from "../../utils/handleRequest";
import { CatchErrorDetails } from "../../utils/handleCatchError";
import { verifyIfEmailIsUsedValidations } from "../validations/verification-validation";

@Tags("Verification service")
@Route("verification")
export class VerificationController extends Controller {
	// TODO: This route can be deleted if not used
	@Post("emailUsed")
	public async verifyIfEmailIsUsed(@Body() input: { email: string }): Promise<boolean | CatchErrorDetails> {
		return handleRequest<boolean>(this, async () => {
			await verifyIfEmailIsUsedValidations(input.email);
			return true;
		});
	}
}
