import { Controller, Post, Body, Param, Get } from '@nestjs/common';
import { CandidateAnswerService } from '../candidate-answer/candidate-answer.service';
import { CandidateService } from '../candidate/candidate.service';
import { AIService } from '../ai/ai.service';

@Controller('questions')
export class QuestionController {
  constructor(
    private readonly answerService: CandidateAnswerService,
    private readonly candidateService: CandidateService,
    private readonly aiService: AIService,
  ) {}

  // Submit answer
  @Post('submit/:candidateId')
  async submitAnswer(
    @Param('candidateId') candidateId: number,
    @Body() body: { question: string; response: string; score?: number },
  ) {  
    const candidate = await this.candidateService.findOne(candidateId);
    if (!candidate) return { message: 'Candidate not found' };

    return this.answerService.createAnswer(candidate, body.question, body.response, body.score || 0);
  }

  // Get all answers for candidate
  @Get('all/:candidateId')
  async getAllAnswers(@Param('candidateId') candidateId: number) {
    return this.answerService.getAllByCandidate(candidateId);
  }

  // ✅ Auto score all answers and generate summary
  @Post('score/:candidateId')
  async scoreCandidate(@Param('candidateId') candidateId: number) {
    const candidate = await this.candidateService.findOne(candidateId);
    if (!candidate) return { message: 'Candidate not found' };

    // Get all answers
    const answers = await this.answerService.getAllByCandidate(candidateId);

    let totalScore = 0;
    for (const ans of answers) {
      const score = await this.aiService.scoreAnswer(ans.response, ans.question);
      ans.score = score;
      totalScore += score;
      await this.answerService.createAnswer(ans.candidate, ans.question, ans.response, score);
    }

    // Calculate average or total score
    candidate.score = totalScore;
    candidate.summary = await this.aiService.generateSummary(answers);

    // Save final score and summary
    await this.candidateService.create(candidate);

    return {
      message: 'Candidate scored successfully',
      totalScore,
      summary: candidate.summary,
      answers,
    };
  }
}
