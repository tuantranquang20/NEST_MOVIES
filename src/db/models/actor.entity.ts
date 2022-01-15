import { UserGender } from 'src/modules/interface';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
} from 'typeorm';

@Entity({ name: 'actors' })
export class Actor {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false })
  name: string;

  @Column({ nullable: true })
  gender: UserGender;

  @Column({ nullable: true })
  dateOfBirth: Date;

  @Column({ nullable: true })
  description: string;

  @Column({ nullable: true })
  nation: string;

  @Column({ nullable: true })
  type: string;

  @Column({ nullable: true })
  coverImage: string;

  @Column({ nullable: false })
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
