import { sql } from './lib/postgres';

async function setup() {
  await sql/*sql*/ `
    CREATE TABLE IF NOT EXISTS users(
      id SERIAL PRIMARY KEY,
      first_name TEXT,
      last_name TEXT,
      document TEXT UNIQUE,
      email TEXT,
      password TEXT,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )
  `;

  await sql.end();

  console.log('Setup complete');
}

setup();
