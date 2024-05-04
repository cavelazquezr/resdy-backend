import { putObject } from "../../config/S3";
import { getCurrentUserInfo } from "../models/auth-models";

import sharp from "sharp";

export const postAvatarHandler = async (authorization: string, image: Express.Multer.File): Promise<void> => {
	const user = await getCurrentUserInfo(authorization);

	// Resize the image
	const buffer = await sharp(image.buffer).resize({ height: 500, width: 500, fit: "cover" }).toBuffer();

	const mimetype = image.mimetype;
	if (user) {
		const image_name = `${user.id}-avatar`;
		const bucket_key = `users/${user.id}/${image_name}`;

		await putObject(bucket_key, buffer, mimetype);
	}
};
