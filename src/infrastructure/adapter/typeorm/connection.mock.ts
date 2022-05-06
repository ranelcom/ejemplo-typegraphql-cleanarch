// application dependencies
import { Connection } from 'typeorm';
import { IConnection } from './connection';

export default class MockConnection implements IConnection {
  private conn: Connection;

  constructor(id: string, methods: any) {
    this.conn = <any>{
      getRepository: () => methods,
      manager: {
        save: () => Promise.resolve({ id }),
      },
    };
  }

  public async connect(): Promise<void> {
    return null;
  }

  public getConnection(): Connection {
    return this.conn;
  }

  public close(): Promise<void> {
    return null;
  }
}
