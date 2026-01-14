import { Inject, Injectable } from '@nestjs/common';
import {
  type IUserRepository,
  USER_REPOSITORY,
} from '@src/domain/repositories/user.repository.interface';
import type { User } from '@src/domain/entities/user.entity';
import {
  EntityAlreadyExistsException,
  EntityNotFoundException,
} from '@src/shared/exceptions';

export interface UpdateProfileDto {
  nickname?: string;
  avatarUrl?: string;
}

@Injectable()
export class UpdateProfileUseCase {
  constructor(
    @Inject(USER_REPOSITORY)
    private readonly userRepository: IUserRepository,
  ) {}

  async execute(userId: string, dto: UpdateProfileDto): Promise<User> {
    const user = await this.userRepository.findById(userId);

    if (!user) throw new EntityNotFoundException('User', userId);

    // Check if nickname is taken by another user
    if (dto.nickname && dto.nickname !== user.nickname) {
      const existingUser = await this.userRepository.findByNickname(
        dto.nickname,
      );
      if (existingUser && existingUser.id !== userId) {
        throw new EntityAlreadyExistsException(
          'User',
          'nickname',
          dto.nickname,
        );
      }
    }

    return await this.userRepository.update(userId, dto);
  }
}
