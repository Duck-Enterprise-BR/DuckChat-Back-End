import { Injectable } from "@nestjs/common";
import * as AWS from "aws-sdk";
import * as crypto from "crypto";

@Injectable()
export class UploadImage{
  async upload(userId: number, file: Express.Multer.File): Promise<string>{
    AWS.config.update({
      credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY,
        secretAccessKey: process.env.AWS_SECRET_KEY
      }
    });
  
    const s3 = new AWS.S3();
    const keyFile = `${file.originalname}-${userId}-${crypto.randomUUID()}`;

    const uploadS3 = await s3.upload({
      Bucket: process.env.BUCKET,
      Key: keyFile,
      Body: file.buffer,
      ACL: "public-read",
      ContentType: file.mimetype
    }).promise();

    return uploadS3.Location;
  }
}
