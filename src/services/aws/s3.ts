import { S3Client, PutObjectCommand, GetObjectCommand, DeleteObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { AWS_ACCESS_KEY, AWS_REGION, AWS_SECRET_ACCESS_KEY, AWS_BUCKET_NAME } from "../../config";
import { Readable } from "stream";

export const s3Client = new S3Client({
	region: AWS_REGION,
	credentials: {
		accessKeyId: AWS_ACCESS_KEY,
		secretAccessKey: AWS_SECRET_ACCESS_KEY,
	},
});

export const getObject = async (key: string): Promise<Buffer> => {
	const command = new GetObjectCommand({
		Bucket: AWS_BUCKET_NAME,
		Key: key,
	});
	const response = await s3Client.send(command);

	if (!response.Body) {
		throw new Error("Response body is undefined");
	}

	const stream = response.Body as Readable;

	const chunks: Buffer[] = [];
	for await (const chunk of stream) {
		chunks.push(Buffer.from(chunk));
	}

	return Buffer.concat(chunks);
};

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

export const putURL = (key: string, fileName: string, contentType: string, bucket: string) => {
	const command = new PutObjectCommand({
		Key: key,
		Bucket: bucket,
		ContentType: contentType,
		Metadata: { filename: fileName },
	});
	return getSignedUrl(s3Client, command);
};

export const deleteObject = async (key: string): Promise<void> => {
	const command = new DeleteObjectCommand({
		Bucket: AWS_BUCKET_NAME,
		Key: key,
	});
	await s3Client.send(command);
};
