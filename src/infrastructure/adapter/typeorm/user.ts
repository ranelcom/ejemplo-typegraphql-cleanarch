import { Connection } from 'typeorm';
import { IUserAdapter } from '../../../application/interface/user';
import { User } from './entity/user';
import UserInput from '../../../domain/user-input';

export default class implements IUserAdapter {
  private conn!: Connection;

  constructor(conn: Connection) {
    this.conn = conn;
  }

  public async create(variables: UserInput): Promise<User> {
    console.log('IUserAdapter_create');
    const repository = this.conn.getRepository(User);
    const user = await repository.create(variables).save();
    return user;
  }
}
