import { Injectable } from '@nestjs/common';

@Injectable()
export class AIService {
  // Dummy scoring: you can integrate OpenAI later
  async scoreAnswer(response: string, question: any): Promise<number> {
    // Return random score for now
    return Math.floor(Math.random() * 11); // 0-10
  }

  // Dummy summary generation
  async generateSummary(answers: any[]): Promise<string> {
    return 'Candidate performed well. (AI summary placeholder)';
  }
}
