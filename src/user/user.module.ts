import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { PrismaService } from 'src/prisma.service';
import { CryptoService } from 'src/crypto/crypto.service';
import { UploadImage } from 'src/upload-image/upload-image.service';

@Module({
  controllers: [UserController],
  providers: [
    UserService, 
    PrismaService, 
    CryptoService,
    UploadImage
  ]
})
export class UserModule {}
