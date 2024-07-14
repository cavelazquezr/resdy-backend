import { AWS_BUCKET_NAME } from "../../config";
import { deleteObject, getObject, getObjectSignedUrl, putObject, putURL } from "../../services/aws/s3";
import { getCurrentUserInfo } from "../models/auth-models";

import sharp from "sharp";

export const getObjectHandler = async (key: string): Promise<Buffer> => {
	return await getObject(key);
};

export const postAvatarHandler = async (authorization: string, image: Express.Multer.File): Promise<void> => {
	const user = await getCurrentUserInfo(authorization);

	// Resize the image
	let sharpInstance = sharp(image.buffer);

	// Check and rotate based on EXIF orientation
	const metadata = await sharpInstance.metadata();
	if (metadata.orientation && metadata.orientation >= 5 && metadata.orientation <= 8) {
		sharpInstance = sharpInstance.rotate();
	}

	const buffer = await sharpInstance.resize({ height: 500, width: 500, fit: "cover" }).toBuffer();

	const mimetype = image.mimetype;
	if (user) {
		const image_name = `${user.id}-avatar`;
		const bucket_key = `users/${user.id}/${image_name}`;

		await putObject(bucket_key, buffer, mimetype);
	}
};

export const getSignedUrlHandler = async (key: string): Promise<string> => {
	return await getObjectSignedUrl(key);
};

export const createSignedUrlsHandler = async (
	files: { key: string; contentType: string; fileName: string }[],
): Promise<{
	[key: string]: string;
}> => {
	const signedUrls: { [key: string]: string } = {};
	for (const file of files) {
		signedUrls[file.key] = await putURL(
			file.key as string,
			file.fileName as string,
			file.contentType as string,
			AWS_BUCKET_NAME,
		);
	}
	return signedUrls;
};

export const deleteFileHandler = async (key: string): Promise<void> => {
	await deleteObject(key);
};
