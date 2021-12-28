import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Movie } from './movie.entity';

@Entity({ name: 'posts' })
export class Post {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false })
  movieId: number;

  @Column({ nullable: false })
  userId: number;

  @Column({ nullable: false })
  content: string;

  @Column({ nullable: true })
  time: Date;

  @Column({ nullable: false })
  point: number;

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt: Date;

  @DeleteDateColumn({ type: 'timestamp', nullable: true })
  deletedAt: Date;

  @Column({ nullable: true })
  createdBy: number;

  @Column({ nullable: true })
  updatedBy: number;

  @Column({ nullable: true })
  deletedBy: number;

  @ManyToOne(() => Movie, (movie) => movie.id)
  @JoinColumn({
    name: 'movieId',
  })
  movie: Movie;
}
