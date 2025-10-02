import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Candidate } from './candidate.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class CandidateService {
  constructor(
    @InjectRepository(Candidate)
    private readonly candidateRepo: Repository<Candidate>,
  ) {}

  async create(candidateData: Partial<Candidate>) {
    const candidate = this.candidateRepo.create(candidateData);
    return this.candidateRepo.save(candidate);
  }

  async findOne(id: number) {
    return this.candidateRepo.findOne({ where: { id }, relations: ['candidateAnswers'] });
  }

  async findAll(): Promise<Candidate[]> {
    return this.candidateRepo.find({ order: { uploadedAt: 'DESC' } });
  }

  async findByEmail(email: string) {
    return this.candidateRepo.findOne({ where: { email } });
  }

  async delete(id: number) {
    return this.candidateRepo.delete(id);
  }

  extractCandidateInfo(text: string): Partial<Candidate> {
    const normalizedText = text.replace(/\r?\n|\r/g, '\n');

    const emailMatch = normalizedText.match(/[a-zA-Z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}/i);
    const email = emailMatch ? emailMatch[0] : undefined;

    const phoneMatch = normalizedText.match(/(?:\+91[\s-]?|0)?(\d{10})/);
    const phone = phoneMatch ? phoneMatch[1] : undefined;

    const lines = normalizedText.split('\n').map(l => l.trim()).filter(l => l.length > 0);
    let name: string | undefined;
    for (const line of lines) {
      if (
        line !== email &&
        !line.includes(phone ?? '') &&
        /^[A-Za-z\s]+$/.test(line) &&
        line.split(' ').length <= 4
      ) {
        name = line;
        break;
      }
    }

    return { name, email, phone };
  }
}
