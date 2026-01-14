import { IsNotEmpty, IsEnum } from 'class-validator';

export class UpdateRoleDto {
  @IsNotEmpty()
  @IsEnum(['user', 'moderator', 'admin'], {
    message: 'Role must be one of: user, moderator, admin',
  })
  role: 'user' | 'moderator' | 'admin';
}
