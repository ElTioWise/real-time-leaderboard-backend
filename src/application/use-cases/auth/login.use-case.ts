import { Injectable, Inject } from '@nestjs/common';
import { User } from '@src/domain/entities/user.entity';
import type { IUserRepository } from '@src/domain/repositories/user.repository.interface';
import { USER_REPOSITORY } from '@src/domain/repositories/user.repository.interface';
import { InvalidCredentialsException } from '@src/shared/exceptions';
import { EncryptService } from '@src/application/services/encrypt.service';

export interface LoginInput {
  email: string;
  password: string;
}

@Injectable()
export class LoginUseCase {
  constructor(
    @Inject(USER_REPOSITORY)
    private readonly userRepository: IUserRepository,
    private readonly encryptService: EncryptService,
  ) {}

  async execute(input: LoginInput): Promise<User> {
    // Find user with password
    const user = await this.userRepository.findByEmailWithPassword(input.email);

    if (!user) throw new InvalidCredentialsException();

    if (!user.isActive) throw new InvalidCredentialsException();

    if (!user.password) throw new InvalidCredentialsException();

    // Verify password
    const isPasswordValid = await this.encryptService.comparePasswords(
      input.password,
      user.password,
    );

    if (!isPasswordValid) throw new InvalidCredentialsException();

    // Remove password from response
    delete user.password;

    return user;
  }
}
