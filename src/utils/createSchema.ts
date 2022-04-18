import { buildSchema } from 'type-graphql';
import { RegisterResolver } from '../modules/user/Register';

export const createSchema = () =>
  buildSchema({
    resolvers: [RegisterResolver],
    authChecker: ({ context: { req } }) => !!req.session.userId,
  });
