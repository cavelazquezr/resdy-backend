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
	// TODO: This route can be deleted if not used
	@Post("avatar")
	public async postAvatar(
		@Header() authorization: string,
		@UploadedFile("image") image: Express.Multer.File,
	): Promise<void> {
		await postAvatarHandler(authorization, image);
	}
	//
	@Post("getSignedUrl")
	public async getSignedUrls(@Body() input: { key: string }): Promise<string> {
		return getSignedUrlHandler(input.key);
	}
	@Post("putSignedUrls")
	public async putFilesSignedUrl(
		@Body() files: { key: string; contentType: string; fileName: string }[],
	): Promise<{ [key: string]: string }> {
		return createSignedUrlsHandler(files);
	}
	@Post("deleteObject")
	public async deleteObject(@Body() input: { key: string }): Promise<void> {
		return deleteFileHandler(input.key);
	}
}
