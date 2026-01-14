import { Exclude, Expose } from 'class-transformer';
import type { UserRole } from '@src/shared/constants';

@Exclude()
export class UserResponseDto {
  @Expose()
  id: string;

  @Expose()
  email: string;

  @Expose()
  nickname: string;

  @Expose()
  avatarUrl?: string;

  @Expose()
  role: UserRole;

  @Expose()
  oauthProvider?: string;

  @Expose()
  isActive: boolean;

  @Expose()
  createdAt: Date;

  @Expose()
  updatedAt: Date;
}
