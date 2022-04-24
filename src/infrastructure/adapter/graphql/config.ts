// Import module ApolloServer.
import { ApolloServer } from 'apollo-server';
// Receive resolver and convert schema of graphql.
import { buildSchema } from 'type-graphql';
// Import a resolver personal to do query query.
import { UserResolver } from './resolver';

import DataSource from '../../../application/datasource';
import Context from './context';

export async function configServer(
  port: number,
  datasource: DataSource,
): Promise<ApolloServer> {
  // Init server Apollo.
  const server = new ApolloServer({
    // Define route for query of graphql.
    schema: await buildSchema({
      resolvers: [UserResolver],
    }),
    context: async () => <Context>{
            datasource,
          },

  });

  server.listen({ port }, () => {
    console.log('server started on http://localhost:4000/graphql');
  });

  return server;
}
