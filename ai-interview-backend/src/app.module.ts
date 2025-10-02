import { Module, forwardRef } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CandidateModule } from './candidate/candidate.module';
import { QuestionModule } from './question/question.module';
import { CandidateAnswerModule } from './candidate-answer/candidate-answer.module';
import { AIService } from './ai/ai.service';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: '',
      database: 'ai_interview',
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true,
    }),
    forwardRef(() => CandidateModule),
    forwardRef(() => QuestionModule),
    forwardRef(() => CandidateAnswerModule),
  ],
  providers: [AIService],
})
export class AppModule {}
