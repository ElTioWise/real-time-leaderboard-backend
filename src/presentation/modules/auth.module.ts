import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AuthController } from '../controllers/auth.controller';
import { RegisterUseCase } from '@src/application/use-cases/auth/register.use-case';
import { LoginUseCase } from '@src/application/use-cases/auth/login.use-case';
import { AuthService } from '@src/application/services/auth.service';
import { User } from '@src/domain/entities/user.entity';
import { UserRepository } from '@src/infrastructure/database/repositories/user.repository';
import { USER_REPOSITORY } from '@src/domain/repositories/user.repository.interface';
import { JwtStrategy } from '@src/infrastructure/auth/strategies/jwt.strategy';
import { JwtAuthGuard } from '../guards/jwt-auth.guard';
import { RolesGuard } from '../guards/roles.guard';
import { APP_GUARD } from '@nestjs/core';
import { EncryptService } from '@src/application/services/encrypt.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        secret: configService.get('JWT_SECRET'),
        signOptions: {
          expiresIn: configService.get('JWT_EXPIRY'),
        },
      }),
    }),
  ],
  controllers: [AuthController],
  providers: [
    // Use Cases
    RegisterUseCase,
    LoginUseCase,

    // Services
    AuthService,
    EncryptService,

    // Repositories
    {
      provide: USER_REPOSITORY,
      useClass: UserRepository,
    },

    // Strategies
    JwtStrategy,

    // Global Guards
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
    {
      provide: APP_GUARD,
      useClass: RolesGuard,
    },
  ],
  exports: [AuthService, USER_REPOSITORY],
})
export class AuthModule {}
