import {injectable} from '@loopback/core';
import * as jwt from 'jsonwebtoken';

@injectable()
export class TokenService {
  expiration = 60 * 2;
  constructor() {}
  async generate(email: string): Promise<string> {
    return jwt.sign({email}, process.env.JWT_SECRET as string, {
      expiresIn: this.expiration,
    });
  }

  async verify(token: string): Promise<string> {
    return jwt.verify(token, process.env.JWT_SECRET as string) as string;
  }
}
