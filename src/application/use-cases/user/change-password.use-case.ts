import { Injectable, Inject } from '@nestjs/common';
import {
  USER_REPOSITORY,
  type IUserRepository,
} from '@src/domain/repositories/user.repository.interface';
import { EncryptService } from '@src/application/services/encrypt.service';
import {
  EntityNotFoundException,
  UnauthorizedException,
} from '@src/shared/exceptions';

export interface ChangePasswordDto {
  currentPassword: string;
  newPassword: string;
}

@Injectable()
export class ChangePasswordUseCase {
  constructor(
    @Inject(USER_REPOSITORY)
    private readonly userRepository: IUserRepository,
    private readonly encryptService: EncryptService,
  ) {}

  async execute(userId: string, dto: ChangePasswordDto): Promise<void> {
    const user = await this.userRepository.findByEmailWithPassword(
      (await this.userRepository.findById(userId))?.email || '',
    );

    if (!user) throw new EntityNotFoundException('User', userId);

    // OAuth users cannot change password
    if (user.oauthProvider)
      throw new UnauthorizedException('OAuth users cannot change password');

    // Verify current password
    const isPasswordValid = await this.encryptService.comparePasswords(
      dto.currentPassword,
      user.password || '',
    );
    if (!isPasswordValid) {
      throw new UnauthorizedException('Current password is incorrect');
    }

    // Hash new password
    const hashedPassword = await this.encryptService.hashPassword(
      dto.newPassword,
    );
    // Update password
    await this.userRepository.update(userId, { password: hashedPassword });
  }
}
