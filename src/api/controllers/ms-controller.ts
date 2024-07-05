import { Controller, Post, Header, Route, Tags, UploadedFile, Body } from "tsoa";
import {
	createSignedUrlsHandler,
	deleteFileHandler,
	getSignedUrlHandler,
	postAvatarHandler,
} from "../services/micro-services";
import { handleRequest } from "../../utils/handleRequest";
import { CatchErrorDetails } from "../../utils/handleCatchError";

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
	public async getSignedUrls(@Body() input: { key: string }): Promise<string | CatchErrorDetails> {
		return handleRequest<string>(this, async () => {
			return getSignedUrlHandler(input.key);
		});
	}
	@Post("putSignedUrls")
	public async putFilesSignedUrl(
		@Body() files: { key: string; contentType: string; fileName: string }[],
	): Promise<{ [key: string]: string } | CatchErrorDetails> {
		return handleRequest<{
			[key: string]: string;
		}>(this, async () => {
			return createSignedUrlsHandler(files);
		});
	}
	@Post("deleteObject")
	public async deleteObject(@Body() input: { key: string }): Promise<void | CatchErrorDetails> {
		return handleRequest<void>(this, async () => {
			return deleteFileHandler(input.key);
		});
	}
}
