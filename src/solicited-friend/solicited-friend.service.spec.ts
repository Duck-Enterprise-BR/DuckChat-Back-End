import { Test, TestingModule } from '@nestjs/testing';
import { SolicitedFriendService } from './solicited-friend.service';

describe('SolicitedFriendService', () => {
  let service: SolicitedFriendService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SolicitedFriendService],
    }).compile();

    service = module.get<SolicitedFriendService>(SolicitedFriendService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
