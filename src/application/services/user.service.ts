import { Injectable } from '@nestjs/common';
import { GetProfileUseCase } from '../use-cases/user/get-profile.use-case';
import { GetUserByIdUseCase } from '../use-cases/user/get-user-by-id.use-case';
import { UpdateProfileUseCase } from '../use-cases/user/update-profile.use-case';
import { ChangePasswordUseCase } from '../use-cases/user/change-password.use-case';
import {
  ListUsersUseCase,
  type ListUsersQuery,
  type PaginatedUsers,
} from '../use-cases/user/list-users.use-case';
import { UpdateUserRoleUseCase } from '../use-cases/user/update-user-role.use-case';
import { ActivateUserUseCase } from '../use-cases/user/activate-user.use-case';
import { DeactivateUserUseCase } from '../use-cases/user/deactivate-user.use-case';
import { DeleteUserUseCase } from '../use-cases/user/delete-user.use-case';
import type { User } from '@src/domain/entities/user.entity';
import type { UserRole } from '@src/shared/constants';

@Injectable()
export class UserService {
  constructor(
    private readonly getProfileUseCase: GetProfileUseCase,
    private readonly getUserByIdUseCase: GetUserByIdUseCase,
    private readonly updateProfileUseCase: UpdateProfileUseCase,
    private readonly changePasswordUseCase: ChangePasswordUseCase,
    private readonly listUsersUseCase: ListUsersUseCase,
    private readonly updateUserRoleUseCase: UpdateUserRoleUseCase,
    private readonly activateUserUseCase: ActivateUserUseCase,
    private readonly deactivateUserUseCase: DeactivateUserUseCase,
    private readonly deleteUserUseCase: DeleteUserUseCase,
  ) {}

  async getProfile(userId: string): Promise<User> {
    return this.getProfileUseCase.execute(userId);
  }

  async getUserById(userId: string): Promise<User> {
    return this.getUserByIdUseCase.execute(userId);
  }

  async updateProfile(
    userId: string,
    dto: { nickname?: string; avatarUrl?: string },
  ): Promise<User> {
    return this.updateProfileUseCase.execute(userId, dto);
  }

  async changePassword(
    userId: string,
    dto: { currentPassword: string; newPassword: string },
  ): Promise<void> {
    return this.changePasswordUseCase.execute(userId, dto);
  }

  // Admin methods
  async listUsers(query: ListUsersQuery): Promise<PaginatedUsers> {
    return this.listUsersUseCase.execute(query);
  }

  async updateUserRole(userId: string, role: UserRole): Promise<User> {
    return this.updateUserRoleUseCase.execute(userId, role);
  }

  async activateUser(userId: string): Promise<User> {
    return this.activateUserUseCase.execute(userId);
  }

  async deactivateUser(userId: string): Promise<User> {
    return this.deactivateUserUseCase.execute(userId);
  }

  async deleteUser(userId: string): Promise<void> {
    return this.deleteUserUseCase.execute(userId);
  }
}
