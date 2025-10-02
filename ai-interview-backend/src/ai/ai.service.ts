import { Injectable } from '@nestjs/common';

@Injectable()
export class AIService {
  async scoreAnswer(response: string, question: any): Promise<number> {
    // Placeholder scoring logic
    return Math.floor(Math.random() * 11);
  }

  async generateSummary(answers: any[]): Promise<string> {
    return 'Candidate performed well. (AI summary placeholder)';
  }
}
