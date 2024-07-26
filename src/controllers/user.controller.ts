import { UserCore } from '../core/user.core';
import { FastifyReply, FastifyRequest } from 'fastify';
import { UserRepository } from '../repositories/user.repository';

export class UserController {
  async create(request: FastifyRequest, reply: FastifyReply) {
    const user = request.body as any;
    try {
      const [userCore, userRepository] = [new UserCore(), new UserRepository()];
      const user = await userCore.execute(request.body as any);
      const [createUser] = await userRepository.create(user);

      reply.send({
        status: 200,
        message: `User created successfully: ${createUser.first_name}`,
      });
    } catch (error) {
      console.error(error);

      return reply
        .status(500)
        .send({ message: `Error to generate user: ${user.first_name}`, error });
    }
  }
}
