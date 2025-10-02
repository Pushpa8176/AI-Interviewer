import { Controller, Post, Body, Get, Param } from '@nestjs/common';
import { CandidateAnswerService } from './candidate-answer.service';
import { CandidateService } from '../candidate/candidate.service';

@Controller('candidate-answers')
export class CandidateAnswerController {
  constructor(
    private readonly answerService: CandidateAnswerService,
    private readonly candidateService: CandidateService,
  ) {}

  @Post()
  async create(@Body() body: { candidateId: number; question: string; response: string; score?: number }) {
    const candidate = await this.candidateService.findOne(body.candidateId);
    if (!candidate) throw new Error('Candidate not found');

    return this.answerService.createAnswer(candidate, body.question, body.response, body.score || 0);
  }

  @Get('all/:candidateId')
  async getAll(@Param('candidateId') candidateId: number) {
    return this.answerService.getAllByCandidate(candidateId);
  }
}
