import {inject} from '@loopback/core';
import {
  post,
  getModelSchemaRef,
  requestBody,
  response,
  param,
} from '@loopback/rest';
import {User} from '../models';
import {UserService} from '../services';

export class InviteController {
  constructor(
    @inject('services.UserService')
    private userService: UserService,
  ) {}

  @post('/api/invite')
  @response(200, {
    description: 'User model instance',
    content: {'application/json': {schema: getModelSchemaRef(User)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(User, {
            title: 'NewUser',
            exclude: ['id'],
          }),
        },
      },
    })
    user: Omit<User, 'id'>,
  ): Promise<User> {
    return this.userService.create(user);
  }

  @post('/api/invite/verify/{token}')
  async confirm(@param.path.string('token') token: string) {
    try {
      const res = await this.userService.verify(token);
      return {data: res};
    } catch (error) {
      return {error: error.message};
    }
  }
}
