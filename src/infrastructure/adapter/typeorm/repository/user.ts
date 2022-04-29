import { Repository } from 'typeorm';
import { IConnection } from '../connection';
import { User } from '../entity/user';
import UserInput from '../../../../domain/user-input';

import { IUserAdapter } from '../../../../application/interface/user';

export default class implements IUserAdapter {
  private conn: IConnection;

  private repository: Repository<User>;

  constructor(conn: IConnection) {
    if (conn == null) {
      throw new Error("conn param it's undefined");
    }
    this.conn = conn;
  }

  public async setup(): Promise<void> {
    this.repository = this.conn.getConnection().getRepository(User);
  }

  public async create(variables: UserInput): Promise<User> {
    console.log('IUserAdapter_create');
    const user = await this.repository.create(variables).save();
    return user;
  }
}
