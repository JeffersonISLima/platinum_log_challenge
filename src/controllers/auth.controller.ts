import { UserCore } from '../core/user.core';
import { FastifyReply, FastifyRequest } from 'fastify';
import { UserRepository } from '../repositories/user.repository';
import { AuthCore } from '../core/auth.core';

export class AuthController {
  async signin(request: FastifyRequest, reply: FastifyReply) {
    try {
      const authCore = new AuthCore();
      const { password, document } = request.body as any;

      const token = await authCore.authenticateUser(document, password);

      !token
        ? reply.status(401).send({ message: 'Invalid username or password' })
        : reply.send({ token });
    } catch (error) {
      console.error(error);

      return reply
        .status(500)
        .send({ message: `Error to generate token`, error });
    }
  }
}
