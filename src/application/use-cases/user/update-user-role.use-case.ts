import { Inject, Injectable, } from '@nestjs/common';
import {
  type IUserRepository,
  USER_REPOSITORY,
} from '@src/domain/repositories/user.repository.interface';
import type { User } from '@src/domain/entities/user.entity';
import type { UserRole } from '@src/shared/constants';
import {
  DomainException,
  EntityNotFoundException,
} from '@src/shared/exceptions';

@Injectable()
export class UpdateUserRoleUseCase {
  constructor(
    @Inject(USER_REPOSITORY)
    private readonly userRepository: IUserRepository,
  ) {}

  async execute(userId: string, role: UserRole): Promise<User> {
    const user = await this.userRepository.findById(userId);

    if (!user) throw new EntityNotFoundException('user', userId);

    // Validate role
    const validRoles = ['user', 'moderator', 'admin'];
    if (!validRoles.includes(role)) {
      throw new DomainException('Invalid role', 'INVALID_ROLE', { role, validRoles });
    }

    return await this.userRepository.update(userId, { role });
  }
}
