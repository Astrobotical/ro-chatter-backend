import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Job {
  @PrimaryGeneratedColumn()
  id: number | undefined;

  @Column('text')
  type: string | undefined;

  @Column('text')
  data: string | undefined;

  @Column('text')
  status: string | undefined;

  @Column('date')
  createdAt: Date | undefined;

  @Column('date')
  processedAt: Date | undefined;

}