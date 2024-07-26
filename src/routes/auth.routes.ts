import { FastifyInstance } from 'fastify';
import { AuthController } from '../controllers/auth.controller';

export const authRoutes = async (fastify: FastifyInstance) => {
  const authController = new AuthController();

  fastify.post('/signin', authController.signin.bind(authController));
};
