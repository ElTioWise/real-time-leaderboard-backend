import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { CONSTANTS } from '@src/shared/constants';

@Injectable()
export class EncryptService {
  constructor(private readonly saltRounds: number) {
    this.saltRounds = CONSTANTS.BCRYPT_SALT_ROUNDS;
  }
  async hashPassword(password: string): Promise<string> {
    return await bcrypt.hash(password, this.saltRounds);
  }

  async comparePasswords(
    plainPassword: string,
    hashedPassword: string,
  ): Promise<boolean> {
    return bcrypt.compare(plainPassword, hashedPassword);
  }
}
