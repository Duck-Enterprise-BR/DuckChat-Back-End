import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { CryptoService } from './crypto/crypto.service';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { FriendModule } from './friend/friend.module';

@Module({
  imports: [
    UserModule, 
    AuthModule,
    ConfigModule.forRoot({
      envFilePath: ".env",
      isGlobal: true
    }),
    FriendModule
  ],
  controllers: [AppController],
  providers: [AppService, CryptoService],
})
export class AppModule {}
