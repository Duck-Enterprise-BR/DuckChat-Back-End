import { Module } from '@nestjs/common';
import { SolicitedFriendService } from './solicited-friend.service';
import { SolicitedFriendController } from './solicited-friend.controller';
import { PrismaService } from 'src/prisma.service';
import { UserService } from 'src/user/user.service';
import { CryptoService } from 'src/crypto/crypto.service';
import { FriendService } from 'src/friend/friend.service';

@Module({
  controllers: [SolicitedFriendController],
  providers: [SolicitedFriendService, PrismaService, UserService, CryptoService, FriendService],
})
export class SolicitedFriendModule {}
