import User from '@domain/user';
import UserInput from '@domain/user-input';

interface IUserUseCase {
    // Create an user
    create(data: UserInput): Promise<User>
}

interface IUserAdapter {
    create(data: UserInput): Promise<User>
}

export { IUserUseCase, IUserAdapter };
