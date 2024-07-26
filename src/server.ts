import { z } from 'zod';
import fastify from 'fastify';
import postgres from 'postgres';
import { sql } from './lib/postgres';

import { userRoutes } from './routes/user.routes';
import { authRoutes } from './routes/auth.routes';

const app = fastify();

app.register(userRoutes);
app.register(authRoutes);

app.listen({ port: 3000 }, (err, address) => {
  if (err) {
    console.error(err);
    process.exit(1);
  }

  console.log(`Server listening at ${address} `);
});

export default app;
