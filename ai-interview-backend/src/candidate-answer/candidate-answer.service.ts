import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { CandidateAnswer } from './candidate-answer.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Candidate } from '../candidate/candidate.entity';

@Injectable()
export class CandidateAnswerService {
  constructor(
    @InjectRepository(CandidateAnswer)
    private readonly answerRepo: Repository<CandidateAnswer>,
  ) {}

  // Create or update an answer
  async createAnswer(
    candidate: Candidate,
    question: string,
    response: string,
    score: number,
  ) {
    // Check if answer for this question already exists
    let answer = await this.answerRepo.findOne({
      where: { candidate: { id: candidate.id }, question },
      relations: ['candidate'],
    });

    if (answer) {
      // Update existing answer
      answer.response = response;
      answer.score = score;
    } else {
      // Create new answer
      answer = this.answerRepo.create({ candidate, question, response, score });
    }

    return this.answerRepo.save(answer);
  }

  // Get all answers for a candidate
  async getAllByCandidate(candidateId: number) {
    return this.answerRepo.find({
      where: { candidate: { id: candidateId } },
      relations: ['candidate'],
    });
  }

  // Optional: delete answer by ID
  async deleteAnswer(id: number) {
    return this.answerRepo.delete(id);
  }
}
