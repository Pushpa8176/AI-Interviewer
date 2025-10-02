import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Question {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  text: string;

  @Column({ type: 'enum', enum: ['Easy', 'Medium', 'Hard'] })
  difficulty: 'Easy' | 'Medium' | 'Hard';
}
