import { Test, TestingModule } from '@nestjs/testing';
import { CandidateAnswerController } from './candidate-answer.controller';

describe('AnswerController', () => {
  let controller: CandidateAnswerController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CandidateAnswerController],
    }).compile();

    controller = module.get<CandidateAnswerController>(CandidateAnswerController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
