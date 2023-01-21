import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { CryptoService } from './crypto/crypto.service';

@Module({
  imports: [UserModule],
  controllers: [AppController],
  providers: [AppService, CryptoService],
})
export class AppModule {}
