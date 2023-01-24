import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { CryptoService } from './crypto/crypto.service';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    UserModule, 
    AuthModule,
    ConfigModule.forRoot({
      envFilePath: ".env",
      isGlobal: true
    })
  ],
  controllers: [AppController],
  providers: [AppService, CryptoService],
})
export class AppModule {}
