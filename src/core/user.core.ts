import { z } from 'zod';
import bcrypt from 'bcryptjs';

export class UserCore {
  async execute(user: {
    email: string;
    document: string;
    password: string;
    last_name: string;
    first_name: string;
  }) {
    const userSchema = z.object({
      document: z
        .string()
        .length(11, { message: 'CPF must be exactly 11 characters long' }),

      first_name: z.string().min(3, { message: 'First name cannot be empty' }),
      password: z.string().min(3, { message: 'Password cannot be empty' }),
      last_name: z.string().optional(),
      email: z.string().optional(),
    });

    return {
      ...userSchema.parse(user),
      password: await this.generateHash(user.password, 10),
    };
  }

  async generateHash(password: string, saltRounds: number): Promise<string> {
    const salt = await bcrypt.genSalt(saltRounds);
    const hash = await bcrypt.hash(password, salt);
    return hash;
  }
}
