import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { User } from './user.entity';
import { UserTokenType } from '../../modules/auth/auth.constant';

@Entity({ name: 'user_tokens' })
export class UserToken {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  userId: number;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'userId' })
  user?: User;

  // hash token value to find faster
  @Column({ length: 2000 })
  hashToken: string;

  @Column({ type: 'blob' })
  token: string;

  @Column({
    type: 'enum',
    enum: UserTokenType,
    default: UserTokenType.REFRESH_TOKEN,
  })
  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;

  @Column({ type: 'timestamp', nullable: true })
  deletedAt: Date;
}
