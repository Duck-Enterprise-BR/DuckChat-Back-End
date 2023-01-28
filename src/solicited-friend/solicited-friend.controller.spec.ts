import { Test, TestingModule } from '@nestjs/testing';
import { SolicitedFriendController } from './solicited-friend.controller';
import { SolicitedFriendService } from './solicited-friend.service';

describe('SolicitedFriendController', () => {
  let controller: SolicitedFriendController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SolicitedFriendController],
      providers: [SolicitedFriendService],
    }).compile();

    controller = module.get<SolicitedFriendController>(SolicitedFriendController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
