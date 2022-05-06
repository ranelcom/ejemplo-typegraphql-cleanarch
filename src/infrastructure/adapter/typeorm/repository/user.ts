import { Repository } from 'typeorm';
import { IConnection } from '../connection';
import UserModel from '../entity/user';
import UserInput from '../../../../domain/user-input';

import { IUserAdapter } from '../../../../application/interface/user';

export default class implements IUserAdapter {
  private conn: IConnection;

  private repository: Repository<UserModel>;

  constructor(conn: IConnection) {
    if (conn == null) {
      throw new Error("conn param it's undefined");
    }
    this.conn = conn;
  }

  public async setup(): Promise<void> {
    this.repository = this.conn.getConnection().getRepository(UserModel);
  }

  public async create(variables: UserInput): Promise<UserModel> {
    console.log('IUserAdapter_create');
    const user: UserModel = await this.repository.save(variables);
    return user;
  }
}
