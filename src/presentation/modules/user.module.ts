import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '@src/domain/entities/user.entity';
import { UserRepository } from '@src/infrastructure/database/repositories/user.repository';
import { USER_REPOSITORY } from '@src/domain/repositories/user.repository.interface';
import { UserController } from '../controllers/user.controller';
import { UserService } from '@src/application/services/user.service';
import { GetProfileUseCase } from '@src/application/use-cases/user/get-profile.use-case';
import { GetUserByIdUseCase } from '@src/application/use-cases/user/get-user-by-id.use-case';
import { UpdateProfileUseCase } from '@src/application/use-cases/user/update-profile.use-case';
import { ChangePasswordUseCase } from '@src/application/use-cases/user/change-password.use-case';
import { ListUsersUseCase } from '@src/application/use-cases/user/list-users.use-case';
import { UpdateUserRoleUseCase } from '@src/application/use-cases/user/update-user-role.use-case';
import { ActivateUserUseCase } from '@src/application/use-cases/user/activate-user.use-case';
import { DeactivateUserUseCase } from '@src/application/use-cases/user/deactivate-user.use-case';
import { DeleteUserUseCase } from '@src/application/use-cases/user/delete-user.use-case';
import { EncryptService } from '@src/application/services/encrypt.service';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  controllers: [UserController],
  providers: [
    // Repository
    {
      provide: USER_REPOSITORY,
      useClass: UserRepository,
    },
    EncryptService,
    // User Use Cases
    GetProfileUseCase,
    GetUserByIdUseCase,
    UpdateProfileUseCase,
    ChangePasswordUseCase,
    // Admin Use Cases
    ListUsersUseCase,
    UpdateUserRoleUseCase,
    ActivateUserUseCase,
    DeactivateUserUseCase,
    DeleteUserUseCase,
    // Service
    UserService,
  ],
  exports: [UserService],
})
export class UserModule {}
