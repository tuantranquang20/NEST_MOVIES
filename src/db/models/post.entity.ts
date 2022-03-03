import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  ManyToOne,
  JoinColumn,
  ManyToMany,
  JoinTable,
} from 'typeorm';
import { User } from './user.entity';

@Entity({ name: 'posts' })
export class Post {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false })
  movieId: number;

  @Column({ nullable: false })
  userId: number;

  @Column({ nullable: false, type: 'nvarchar' })
  content: string;

  @Column({ nullable: false, type: 'nvarchar' })
  title: string;

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

  // @ManyToOne(() => Movie, (movie) => movie.id)
  // @JoinColumn({
  //   name: 'movieId',
  // })
  // movie: Movie;

  @ManyToOne(() => User, (user) => user.posts, { eager: true })
  user: User;
}
