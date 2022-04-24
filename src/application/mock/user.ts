import User from '../../domain/user';
import UserInput from '../../domain/user-input';
import { IUserAdapter } from '../interface/user';

export default class implements IUserAdapter {
  private data: User;

  private err: Error | null;

  constructor(data: User, err: Error | null) {
    this.data = data;
    this.err = err;
  }

  public async create(variables: UserInput): Promise<User> {
    if (this.err) {
      throw this.err;
    }
    return this.data;
  }
}
