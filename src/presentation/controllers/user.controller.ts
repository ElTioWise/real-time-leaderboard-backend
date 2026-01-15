import {
  Controller,
  Get,
  Put,
  Post,
  Delete,
  Body,
  Param,
  Query,
  UseGuards,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { UserService } from '@src/application/services/user.service';
import { JwtAuthGuard } from '../guards/jwt-auth.guard';
import { RolesGuard } from '../guards/roles.guard';
import { Roles } from '../decorators/roles.decorator';
import { CurrentUser } from '../decorators/current-user.decorator';
import { UserResponseDto } from '../dto/user/user-response.dto';
import { UpdateProfileDto } from '../dto/user/update-profile.dto';
import { ChangePasswordDto } from '../dto/user/change-password.dto';
import { ListUsersQueryDto } from '../dto/user/list-users-query.dto';
import { UpdateRoleDto } from '../dto/user/update-role.dto';
import { PaginatedUsersResponseDto } from '../dto/user/paginated-users-response.dto';
import { plainToInstance } from 'class-transformer';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

@Controller('users')
@ApiTags('users')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
export class UserController {
  constructor(private readonly userService: UserService) {}

  // User endpoints
  @Get('me')
  async getProfile(@CurrentUser() userId: string): Promise<UserResponseDto> {
    const user = await this.userService.getProfile(userId);
    return plainToInstance(UserResponseDto, user, {
      excludeExtraneousValues: true,
    });
  }

  @Put('me')
  async updateProfile(
    @CurrentUser() userId: string,
    @Body() dto: UpdateProfileDto,
  ): Promise<UserResponseDto> {
    const user = await this.userService.updateProfile(userId, dto);
    return plainToInstance(UserResponseDto, user, {
      excludeExtraneousValues: true,
    });
  }

  @Post('me/change-password')
  @HttpCode(HttpStatus.NO_CONTENT)
  async changePassword(
    @CurrentUser() userId: string,
    @Body() dto: ChangePasswordDto,
  ): Promise<void> {
    await this.userService.changePassword(userId, dto);
  }

  // Admin endpoints
  @Get()
  @UseGuards(RolesGuard)
  @Roles('admin', 'moderator')
  async listUsers(
    @Query() query: ListUsersQueryDto,
  ): Promise<PaginatedUsersResponseDto> {
    const result = await this.userService.listUsers(query);
    return plainToInstance(PaginatedUsersResponseDto, result, {
      excludeExtraneousValues: true,
    });
  }

  @Get(':id')
  @UseGuards(RolesGuard)
  @Roles('admin', 'moderator')
  async getUserById(@Param('id') id: string): Promise<UserResponseDto> {
    const user = await this.userService.getUserById(id);
    return plainToInstance(UserResponseDto, user, {
      excludeExtraneousValues: true,
    });
  }

  @Put(':id/role')
  @UseGuards(RolesGuard)
  @Roles('admin')
  async updateUserRole(
    @Param('id') id: string,
    @Body() dto: UpdateRoleDto,
  ): Promise<UserResponseDto> {
    const user = await this.userService.updateUserRole(id, dto.role);
    return plainToInstance(UserResponseDto, user, {
      excludeExtraneousValues: true,
    });
  }

  @Post(':id/activate')
  @UseGuards(RolesGuard)
  @Roles('admin')
  @HttpCode(HttpStatus.OK)
  async activateUser(@Param('id') id: string): Promise<UserResponseDto> {
    const user = await this.userService.activateUser(id);
    return plainToInstance(UserResponseDto, user, {
      excludeExtraneousValues: true,
    });
  }

  @Post(':id/deactivate')
  @UseGuards(RolesGuard)
  @Roles('admin')
  @HttpCode(HttpStatus.OK)
  async deactivateUser(@Param('id') id: string): Promise<UserResponseDto> {
    const user = await this.userService.deactivateUser(id);
    return plainToInstance(UserResponseDto, user, {
      excludeExtraneousValues: true,
    });
  }

  @Delete(':id')
  @UseGuards(RolesGuard)
  @Roles('admin')
  @HttpCode(HttpStatus.NO_CONTENT)
  async deleteUser(@Param('id') id: string): Promise<void> {
    await this.userService.deleteUser(id);
  }
}
