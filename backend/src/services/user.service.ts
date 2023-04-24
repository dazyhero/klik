import {inject, injectable} from '@loopback/core';
import {repository} from '@loopback/repository';
import {User} from '../models';
import {UserRepository} from '../repositories';
import {MailService} from './mail.service';
import {PasswordService} from './password.service';
import {TokenService} from './token.service';

@injectable()
export class UserService {
  constructor(
    @inject('services.PasswordService')
    private passwordService: PasswordService,
    @repository(UserRepository)
    private userRepository: UserRepository,
    @inject('services.TokenService')
    private tokenService: TokenService,
    @inject('services.MailService')
    private mailService: MailService,
  ) {}

  async create(user: User) {
    user.password = await this.passwordService.hash(user.password);
    user.isActive = false;
    user.confirmationCode = await this.tokenService.generate(user.email);
    const newUser = await this.userRepository.create(user);
    await this.mailService.send(user.email, user.confirmationCode);
    return newUser;
  }

  async verify(token: string) {
    const user = await this.userRepository.findOne({
      where: {confirmationCode: token},
    });
    if (!user) {
      throw new Error('User not found');
    }
    await this.tokenService.verify(token);
    user.isActive = true;
    user.confirmationCode = '';
    await this.userRepository.updateById(user.id, user);
    return user.email;
  }
}
