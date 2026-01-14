import { Exclude, Expose, Type } from 'class-transformer';
import { UserResponseDto } from './user-response.dto';

@Exclude()
export class PaginatedUsersResponseDto {
  @Expose()
  @Type(() => UserResponseDto)
  users: UserResponseDto[];

  @Expose()
  total: number;

  @Expose()
  page: number;

  @Expose()
  limit: number;

  @Expose()
  totalPages: number;
}
