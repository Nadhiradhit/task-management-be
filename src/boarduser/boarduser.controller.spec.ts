import { Test, TestingModule } from '@nestjs/testing';
import { BoarduserController } from './boarduser.controller';

describe('BoarduserController', () => {
  let controller: BoarduserController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [BoarduserController],
    }).compile();

    controller = module.get<BoarduserController>(BoarduserController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
