import { Controller, Post, Header, Route, Tags, UploadedFile, Body } from "tsoa";
import {
	createSignedUrlsHandler,
	deleteFileHandler,
	getSignedUrlHandler,
	postAvatarHandler,
} from "../services/micro-services";

@Tags("Microservices")
@Route("microservices")
export class MicroservicesController extends Controller {
	@Post("avatar")
	public async postAvatar(
		@Header() authorization: string,
		@UploadedFile("image") image: Express.Multer.File,
	): Promise<void> {
		await postAvatarHandler(authorization, image);
	}
	@Post("getSignedUrl")
	public async getSignedUrls(@Body() input: { key: string }) {
		return getSignedUrlHandler(input.key);
	}
	@Post("putSignedUrls")
	public async putFilesSignedUrl(@Body() files: { key: string; contentType: string; fileName: string }[]) {
		return createSignedUrlsHandler(files);
	}
	@Post("deleteObject")
	public async deleteObject(@Body() input: { key: string }) {
		return deleteFileHandler(input.key);
	}
}
