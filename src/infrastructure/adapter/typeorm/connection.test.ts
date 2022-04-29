// Application dependencies.
import { Connection } from 'typeorm';

class MockConnection {
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
}

export { MockConnection };
