"use server";
import { PutObjectCommand, S3Client } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { auth } from "@/auth";
import { wait } from "@/lib/utils";

console.log("process.env.AWS_REGION: ", process.env.AWS_REGION);
console.log("process.env.AWS_ACCESS_KEY_ID: ", process.env.AWS_ACCESS_KEY_ID);
console.log(
  "process.env.AWS_SECRET_ACCESS_KEY: ",
  process.env.AWS_SECRET_ACCESS_KEY
);

const s3 = new S3Client({
  region: process.env.AWS_REGION!,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
  },
});

export const getSignedURL = async () => {
  const session = await auth();

  if (!session) {
    return {
      failure: {
        message: "Not authenticated",
      },
    };
  }
  wait(2000);

  const putObjectCommand = new PutObjectCommand({
    Bucket: process.env.AWS_BUCKET_NAME!,
    Key: session?.user?.id,
  });

  const signedUrl = await getSignedUrl(s3, putObjectCommand, {
    expiresIn: 60,
  });

  return {
    success: {
      url: signedUrl,
    },
  };
};
