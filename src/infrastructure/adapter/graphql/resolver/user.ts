import { Resolver, Query, Mutation, Arg, Ctx } from 'type-graphql';
import bcrypt from 'bcryptjs';

import Context from '../context';
import User from '../type/user';
import { UserInput } from '../type/user-input';

@Resolver()
export class UserResolver {
  @Query(() => String)
  async hello() {
    return 'Hello World!';
  }

  @Mutation(() => User)
  async register(
    @Arg('data', () => UserInput) data: UserInput,
    @Ctx() context: Context,
  ): Promise<User> {
    const hashedPassword = await bcrypt.hash(data.password, 12);
    data.password = hashedPassword;

    const user = await context.datasource.user
      .create(data.toDomain());

    return user;
  }
}
