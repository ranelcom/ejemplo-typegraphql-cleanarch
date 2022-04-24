import User from '../../domain/user';
import UserInput from '../../domain/user-input';

interface IUserAdapter {
    // Create an user
    create(data: UserInput): Promise<User>
}

export { IUserAdapter };
