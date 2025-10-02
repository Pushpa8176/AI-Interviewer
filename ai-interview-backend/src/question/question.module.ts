import { Module, forwardRef } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Question } from './question.entity';
import { QuestionService } from './question.service';
import { QuestionController } from './question.controller';
import { CandidateAnswerModule } from '../candidate-answer/candidate-answer.module';
import { CandidateModule } from '../candidate/candidate.module';
import { AIService } from '../ai/ai.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Question]),
    forwardRef(() => CandidateAnswerModule), // avoid circular dependency
    forwardRef(() => CandidateModule),
  ],
  controllers: [QuestionController],
  providers: [QuestionService, AIService],
  exports: [QuestionService],
})
export class QuestionModule {}
