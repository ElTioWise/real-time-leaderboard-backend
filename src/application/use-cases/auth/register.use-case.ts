import { Injectable, Inject } from '@nestjs/common';
import { User } from '@src/domain/entities/user.entity';
import type { IUserRepository } from '@src/domain/repositories/user.repository.interface';
import { USER_REPOSITORY } from '@src/domain/repositories/user.repository.interface';
import { EntityAlreadyExistsException } from '@src/shared/exceptions';
import { EncryptService } from '@src/application/services/encrypt.service';

export interface RegisterInput {
  email: string;
  password: string;
  nickname: string;
}

@Injectable()
export class RegisterUseCase {
  constructor(
    @Inject(USER_REPOSITORY)
    private readonly userRepository: IUserRepository,
    private readonly encryptService: EncryptService,
  ) {}

  async execute(input: RegisterInput): Promise<User> {
    // Check if email already exists
    const existingUserByEmail = await this.userRepository.findByEmail(
      input.email,
    );
    if (existingUserByEmail) {
      throw new EntityAlreadyExistsException('User', 'email', input.email);
    }

    // Check if nickname already exists
    const existingUserByNickname = await this.userRepository.findByNickname(
      input.nickname,
    );
    if (existingUserByNickname) {
      throw new EntityAlreadyExistsException(
        'User',
        'nickname',
        input.nickname,
      );
    }

    // Hash password
    const hashedPassword = await this.encryptService.hashPassword(
      input.password,
    );

    // Create user
    const user = new User();
    user.email = input.email.toLowerCase();
    user.password = hashedPassword;
    user.nickname = input.nickname;
    user.role = 'user';
    user.isActive = true;

    return this.userRepository.save(user);
  }
}
