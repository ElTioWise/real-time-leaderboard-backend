import { Injectable, Inject } from '@nestjs/common';
import {
  USER_REPOSITORY,
  type IUserRepository,
} from '@src/domain/repositories/user.repository.interface';
import type { User } from '@src/domain/entities/user.entity';
import { EntityNotFoundException } from '@src/shared/exceptions';

@Injectable()
export class GetProfileUseCase {
  constructor(
    @Inject(USER_REPOSITORY)
    private readonly userRepository: IUserRepository,
  ) {}

  async execute(userId: string): Promise<User> {
    const user = await this.userRepository.findById(userId);

    if (!user) throw new EntityNotFoundException('User', userId);

    return user;
  }
}
