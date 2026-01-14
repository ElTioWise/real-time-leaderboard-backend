import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
} from 'typeorm';
import type { UserRole } from '@src/shared/constants';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  email: string;

  @Column({ select: false })
  password?: string;

  @Column({ unique: true })
  nickname: string;

  @Column({ nullable: true })
  avatarUrl?: string;

  @Column({ type: 'varchar', default: 'user' })
  role: UserRole;

  @Column({ nullable: true })
  oauthProvider?: string;

  @Column({ nullable: true })
  oauthId?: string;

  @Column({ default: true })
  isActive: boolean;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt?: Date;

  // Domain methods
  isAdmin(): boolean {
    return this.role === 'admin';
  }

  isModerator(): boolean {
    return this.role === 'moderator' || this.isAdmin();
  }

  canModerate(): boolean {
    return this.isModerator();
  }

  activate(): void {
    this.isActive = true;
  }

  deactivate(): void {
    this.isActive = false;
  }
}
