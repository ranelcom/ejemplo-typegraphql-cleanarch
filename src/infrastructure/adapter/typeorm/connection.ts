import { createConnection, Connection } from 'typeorm';
import { UserModel } from './entity';

export interface IConnection {
  connect(): Promise<void>;
  getConnection(): Connection;
  close(): Promise<void>;
}

export default class implements IConnection {
  private conn: Connection;

  public async connect(): Promise<void> {
    this.conn = await createConnection({
      name: 'default',
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'postgres',
      database: 'typegraphql-example',
      synchronize: true,
      logging: true,
      entities: [UserModel],
    });
  }

  public getConnection(): Connection {
    return this.conn;
  }

  public async close(): Promise<void> {
    await this.conn.close();
  }
}
