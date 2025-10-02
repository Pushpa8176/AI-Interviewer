import { Module, forwardRef } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Candidate } from './candidate.entity';
import { CandidateService } from './candidate.service';
import { CandidateController } from './candidate.controller';
import { CandidateAnswerModule } from '../candidate-answer/candidate-answer.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Candidate]),
    forwardRef(() => CandidateAnswerModule), // avoid circular dependency
  ],
  providers: [CandidateService],
  controllers: [CandidateController],
  exports: [CandidateService],
})
export class CandidateModule {}
