import { IUserAdapter } from '../../interface/user';
import User from '../../../domain/user';
import UserInput from '../../../domain/user-input';

export default class implements IUserAdapter {
  private data: UserInput;

  private err: Error | null;

  constructor(data: UserInput, err: Error | null) {
    this.data = data;
    this.err = err;
  }

  public async create(): Promise<User> {
    const user: User = { ...this.data, id: '0' };
    if (this.err) {
      throw this.err;
    }
    return user;
  }
}
