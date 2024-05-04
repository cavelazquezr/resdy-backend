import { S3Client, PutObjectCommand, GetObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { AWS_ACCESS_KEY, AWS_REGION, AWS_SECRET_ACCESS_KEY, AWS_BUCKET_NAME } from ".";

export const s3Client = new S3Client({
	region: AWS_REGION,
	credentials: {
		accessKeyId: AWS_ACCESS_KEY,
		secretAccessKey: AWS_SECRET_ACCESS_KEY,
	},
});

export const putObject = async (key: string, body: Buffer, contentType: string): Promise<void> => {
	const command = new PutObjectCommand({
		Bucket: AWS_BUCKET_NAME,
		Key: key,
		Body: body,
		ContentType: contentType,
	});
	await s3Client.send(command);
};

export const getObjectSignedUrl = async (key: string): Promise<string> => {
	const command = new GetObjectCommand({
		Bucket: AWS_BUCKET_NAME,
		Key: key,
	});
	const url = await getSignedUrl(s3Client, command, { expiresIn: 3600 });

	return url;
};
