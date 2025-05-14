import { Test, TestingModule } from '@nestjs/testing';
import { BoarduserService } from './boarduser.service';

describe('BoarduserService', () => {
  let service: BoarduserService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [BoarduserService],
    }).compile();

    service = module.get<BoarduserService>(BoarduserService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
