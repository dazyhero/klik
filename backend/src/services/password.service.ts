import {injectable} from '@loopback/core';
import * as bcrypt from 'bcrypt';

@injectable()
export class PasswordService {
  saltRounds = 10;
  constructor() {}

  async hash(password: string) {
    const salt = await bcrypt.genSalt(this.saltRounds);
    return bcrypt.hash(password, salt);
  }
}
