import { IsOptional, IsString, Length, Matches } from 'class-validator';

export class UpdateProfileDto {
  @IsOptional()
  @IsString()
  @Length(3, 30)
  @Matches(/^[a-zA-Z0-9_-]+$/, {
    message:
      'Nickname can only contain letters, numbers, underscores and hyphens',
  })
  nickname?: string;

  @IsOptional()
  @IsString()
  avatarUrl?: string;
}
