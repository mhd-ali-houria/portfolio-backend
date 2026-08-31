import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Project {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  desc: string;

  @Column()
  coverImg: string; //cloudflare URL

  @Column('text', { array: true }) //apparently this is how you define postgres-compatible array columns
  subImg: string[];
}
