import { Injectable, Inject } from '@nestjs/common';
import {
  USER_REPOSITORY,
  type IUserRepository,
} from '@src/domain/repositories/user.repository.interface';
import { EntityNotFoundException } from '@src/shared/exceptions';

@Injectable()
export class DeleteUserUseCase {
  constructor(
    @Inject(USER_REPOSITORY)
    private readonly userRepository: IUserRepository,
  ) {}

  async execute(userId: string): Promise<void> {
    const user = await this.userRepository.findById(userId);

    if (!user) throw new EntityNotFoundException('User', userId);

    await this.userRepository.delete(userId);
  }
}
