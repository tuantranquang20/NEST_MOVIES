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

  @Column({ nullable: false })
  year: Date;

  @Column()
  description: string;

  @Column({ nullable: false })
  IMDBPoint: string;

  @Column({ nullable: false }) // phim hanh dong, ...
  type: string;

  @Column({ nullable: false })
  status: boolean;

  @Column({ nullable: false })
  nation: string;

  @Column({ nullable: false })
  trailer: string;

  @Column({ nullable: false })
  time: string;

  @Column({ nullable: true })
  session: string;

  @Column({ nullable: true })
  director: string;

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
