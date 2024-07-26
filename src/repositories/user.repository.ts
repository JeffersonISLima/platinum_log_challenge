import { sql } from '../lib/postgres';

export class UserRepository {
  async create(user: {
    email: string;
    document: string;
    password: string;
    last_name: string;
    first_name: string;
  }) {
    const { email, document, password, last_name, first_name } = user;

    const result = await sql/* sql */ `
    INSERT INTO 
      users (first_name, last_name, document, email, password )
    VALUES
       (${first_name}, ${last_name}, ${document}, ${email}, ${password} )
    RETURNING first_name
  `;

    return result;
  }

  async findOneByDocument(document: string) {
    const result = await sql/* sql */ `
    SELECT
      *
    FROM
      users
    WHERE
      document = ${document}
    `;

    return result;
  }
}
