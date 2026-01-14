import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '@src/domain/entities/user.entity';
import {
  IUserRepository,
  FindAllOptions,
  FindAllResult,
} from '@src/domain/repositories/user.repository.interface';

@Injectable()
export class UserRepository implements IUserRepository {
  constructor(
    @InjectRepository(User)
    private readonly repository: Repository<User>,
  ) {}

  async findById(id: string): Promise<User | null> {
    return this.repository.findOne({ where: { id } });
  }

  async findByEmail(email: string): Promise<User | null> {
    return this.repository.findOne({ where: { email: email.toLowerCase() } });
  }

  async findByEmailWithPassword(email: string): Promise<User | null> {
    return this.repository
      .createQueryBuilder('user')
      .where('LOWER(user.email) = LOWER(:email)', { email })
      .addSelect('user.password')
      .getOne();
  }

  async findByNickname(nickname: string): Promise<User | null> {
    return this.repository.findOne({ where: { nickname } });
  }

  async findByOAuthProvider(
    provider: string,
    oauthId: string,
  ): Promise<User | null> {
    return this.repository.findOne({
      where: { oauthProvider: provider, oauthId },
    });
  }

  async save(user: User): Promise<User> {
    return this.repository.save(user);
  }

  async update(id: string, data: Partial<User>): Promise<User> {
    await this.repository.update(id, data);
    const user = await this.findById(id);
    if (!user) {
      throw new Error('User not found after update');
    }
    return user;
  }

  async delete(id: string): Promise<void> {
    await this.repository.softDelete(id);
  }

  async existsByEmail(email: string): Promise<boolean> {
    const count = await this.repository.count({
      where: { email: email.toLowerCase() },
    });
    return count > 0;
  }

  async existsByNickname(nickname: string): Promise<boolean> {
    const count = await this.repository.count({ where: { nickname } });
    return count > 0;
  }

  async findAll(options: FindAllOptions): Promise<FindAllResult> {
    const { skip = 0, take = 10, search, role, isActive } = options;

    const queryBuilder = this.repository.createQueryBuilder('user');

    // Apply filters
    if (search) {
      queryBuilder.andWhere(
        '(LOWER(user.email) LIKE LOWER(:search) OR LOWER(user.nickname) LIKE LOWER(:search))',
        { search: `%${search}%` },
      );
    }

    if (role) {
      queryBuilder.andWhere('user.role = :role', { role });
    }

    if (isActive !== undefined) {
      queryBuilder.andWhere('user.isActive = :isActive', { isActive });
    }

    // Apply pagination
    queryBuilder.skip(skip).take(take);

    // Order by creation date
    queryBuilder.orderBy('user.createdAt', 'DESC');

    const [users, total] = await queryBuilder.getManyAndCount();

    return { users, total };
  }
}
