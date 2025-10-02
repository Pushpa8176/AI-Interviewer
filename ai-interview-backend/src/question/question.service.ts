import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Question } from './question.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class QuestionService {
  constructor(
    @InjectRepository(Question)
    private readonly questionRepo: Repository<Question>,
  ) {}

  // Get question by ID
  async findOne(id: number) {
    return this.questionRepo.findOne({ where: { id } });
  }

  // Get next question by difficulty
  async getNextQuestion(difficulty: 'Easy' | 'Medium' | 'Hard') {
    return this.questionRepo.findOne({ where: { difficulty } });
  }

  // Get next question for a candidate (placeholder logic)
  async getNextQuestionForCandidate(candidateId: number) {
    return this.questionRepo.findOne({ where: {} }); // return first question (customize later)
  }

  // Get all questions
  async findAll(): Promise<Question[]> {
    return this.questionRepo.find();
  }
}
