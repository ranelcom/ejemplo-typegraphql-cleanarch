import { IUserAdapter, IUserUseCase } from '@interface/user';
import User from '@domain/user';
import UserInput from '@domain/user-input';

export default class implements IUserUseCase {
    private adapter: IUserAdapter;

    constructor(
        adapter: IUserAdapter,
    ) {
        if (adapter == null) {
            throw new Error('User adapter is not valid');
        }
        this.adapter = adapter;
    }

    public async create(data: UserInput): Promise<User> {
        return this.adapter.create(data);
    }
}
