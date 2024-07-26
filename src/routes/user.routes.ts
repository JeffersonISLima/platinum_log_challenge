import { FastifyInstance } from 'fastify';
import { UserController } from '../controllers/user.controller';

export const userRoutes = async (fastify: FastifyInstance) => {
  const userController = new UserController();

  fastify.post('/users/create', userController.create.bind(userController));
};
