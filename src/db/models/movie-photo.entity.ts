import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
} from 'typeorm';

@Entity({ name: 'movie_photos' })
export class MoviePhoto {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false })
  movieId: number;

  @Column({ nullable: false })
  coverImage: string;

  @Column({ nullable: false })
  avatar: string;

  @Column({ nullable: false })
  descriptionImage: string;

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
}
