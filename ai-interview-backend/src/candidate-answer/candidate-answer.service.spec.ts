import { Test, TestingModule } from '@nestjs/testing';
import { CandidateAnswerService } from './candidate-answer.service';

describe('AnswerService', () => {
  let service: CandidateAnswerService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CandidateAnswerService],
    }).compile();

    service = module.get<CandidateAnswerService>(CandidateAnswerService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
