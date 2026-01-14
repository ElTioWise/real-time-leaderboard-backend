import { User } from '../entities/user.entity';

export interface FindAllOptions {
  skip?: number;
  take?: number;
  search?: string;
  role?: string;
  isActive?: boolean;
}

export interface FindAllResult {
  users: User[];
  total: number;
}

export interface IUserRepository {
  findById(id: string): Promise<User | null>;
  findByEmail(email: string): Promise<User | null>;
  findByEmailWithPassword(email: string): Promise<User | null>;
  findByNickname(nickname: string): Promise<User | null>;
  findByOAuthProvider(provider: string, oauthId: string): Promise<User | null>;
  findAll(options: FindAllOptions): Promise<FindAllResult>;
  save(user: User): Promise<User>;
  update(id: string, data: Partial<User>): Promise<User>;
  delete(id: string): Promise<void>;
  existsByEmail(email: string): Promise<boolean>;
  existsByNickname(nickname: string): Promise<boolean>;
}

export const USER_REPOSITORY = Symbol('USER_REPOSITORY');
