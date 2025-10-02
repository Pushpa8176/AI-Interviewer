import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { Candidate } from '../candidate/candidate.entity';

@Entity()
export class CandidateAnswer {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  question: string;

  @Column()
  response: string;

  @Column({ default: 0 })
  score: number;

  @ManyToOne(() => Candidate, candidate => candidate.candidateAnswers, { onDelete: 'CASCADE' })
  candidate: Candidate;
}
