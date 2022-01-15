import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
} from 'typeorm';

@Entity({ name: 'movies' })
export class Movie {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false })
  name: string;

  @Column({ nullable: true })
  originalName: string;

  @Column({ nullable: true })
  year: Date;

  @Column({ nullable: true, length: 5000 })
  description: string;

  @Column({ nullable: true })
  IMDBPoint: string;

  @Column({ nullable: true }) // phim hanh dong, ...
  type: string;

  @Column({ nullable: true }) // is coming
  status: boolean;

  @Column({ nullable: true })
  nation: string;

  @Column({ nullable: true })
  trailer: string;

  @Column({ nullable: true })
  time: string;

  @Column({ nullable: true })
  session: string;

  @Column({ nullable: true })
  director: string;

  @Column({ nullable: true })
  coverImage: string;

  @Column({ nullable: true })
  avatar: string;

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
