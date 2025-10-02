import { Module, forwardRef } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CandidateAnswerService } from './candidate-answer.service';
import { CandidateAnswerController } from './candidate-answer.controller';
import { CandidateAnswer } from './candidate-answer.entity';
import { CandidateModule } from '../candidate/candidate.module';

@Module({
  imports: [TypeOrmModule.forFeature([CandidateAnswer]), forwardRef(() => CandidateModule)],
  providers: [CandidateAnswerService],
  controllers: [CandidateAnswerController],
  exports: [CandidateAnswerService],
})
export class CandidateAnswerModule {}
