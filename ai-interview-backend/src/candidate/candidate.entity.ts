import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, OneToMany } from 'typeorm';
import { CandidateAnswer } from '../candidate-answer/candidate-answer.entity';

@Entity()
export class Candidate {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true })
  name: string;

  @Column({ nullable: true })
  email: string;

  @Column({ nullable: true })
  phone: string;

  @Column({ nullable: true })
  resumeFile: string;

  @Column({ type: 'text', nullable: true })
  chatHistory: string;

  @Column({ nullable: true })
score: number;

  @Column({ type: 'text', nullable: true })
  summary: string;

  @CreateDateColumn({ type: 'timestamp' })
  uploadedAt: Date;

  @OneToMany(() => CandidateAnswer, answer => answer.candidate, { cascade: true })
  candidateAnswers: CandidateAnswer[];
}
