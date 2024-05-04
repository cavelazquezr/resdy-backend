import { Controller, Post, Header, Route, Tags, UploadedFile } from "tsoa";
import { postAvatarHandler } from "../services/micro-services";

@Tags("Microservices")
@Route("upload")
export class MicroservicesController extends Controller {
	@Post("avatar")
	public async postAvatar(
		@Header() authorization: string,
		@UploadedFile("image") image: Express.Multer.File,
	): Promise<void> {
		await postAvatarHandler(authorization, image);
	}
}
