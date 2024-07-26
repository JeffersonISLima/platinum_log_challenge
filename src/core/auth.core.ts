import { z } from 'zod';
import { UserRepository } from '../repositories/user.repository';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const JWT_SECRET_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9';

export class AuthCore {
  async authenticateUser(
    document: string,
    password: string
  ): Promise<string | null> {
    z.object({
      document: z
        .string()
        .length(11, { message: 'CPF must be exactly 11 characters long' }),

      password: z.string().min(1, { message: 'Password cannot be empty' }),
    }).parse({ document, password });

    const userRepository = new UserRepository();
    const [user] = await userRepository.findOneByDocument(document);

    if (user && bcrypt.compareSync(password, user.password)) {
      const token = jwt.sign({ user }, JWT_SECRET_KEY, { expiresIn: '1h' });
      return token;
    }
    return null;
  }
}
