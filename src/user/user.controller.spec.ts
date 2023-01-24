import { Test, TestingModule } from '@nestjs/testing';
import { CryptoService } from 'src/crypto/crypto.service';
import { PrismaService } from 'src/prisma.service';
import { UserController } from './user.controller';
import { UserService } from './user.service';

describe('UserController', () => {
  let controller: UserController;

  // beforeEach(async () => {
  //   const module: TestingModule = await Test.createTestingModule({
  //     controllers: [UserController],
  //     providers: [
  //       UserService,
  //       PrismaService,
  //       CryptoService
  //     ],
  //   }).compile();

  //   controller = module.get<UserController>(UserController);
  // });

});
