// Application dependencies.
import { Connection } from 'typeorm';

class MockConnection {
  private conn: Connection;

  constructor(methods: any) {
    this.conn = <any>{
      getRepository: () => {
        return methods;
      },
      manager: {
        save: (entity: any) => Promise.resolve(),
      },
    };
  }

  public async connect(): Promise<void> {
    return;
  }

  public getConnection(): Connection {
    return this.conn;
  }
}

export { MockConnection };
