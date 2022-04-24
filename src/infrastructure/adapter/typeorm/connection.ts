import { createConnection, Connection } from 'typeorm';
import { User } from './entity/user';

export async function connect(): Promise<Connection> {
  const conn = await createConnection({
    name: 'default',
    type: 'postgres',
    host: 'localhost',
    port: 5432,
    username: 'postgres',
    password: 'postgres',
    database: 'typegraphql-example',
    synchronize: true,
    logging: true,
    entities: [User],
  });
  return conn;
}
