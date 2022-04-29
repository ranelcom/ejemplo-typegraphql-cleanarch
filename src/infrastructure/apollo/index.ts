// Import module ApolloServer.
import { ApolloServer } from 'apollo-server';
import { buildSchema } from 'type-graphql';
import { IHTTPServer } from '@interface/http';
import DataSource from '@application/datasource';
import path from 'path';
import Context from './context';
// Import a resolver personal to do query query.
import resolvers from './resolver';

// IHTTPServer Define a server implementation
export default class implements IHTTPServer {
  private port: string;

  public server: ApolloServer;

  private ds: DataSource;

  private mocks: boolean;

  private isConfigured = false;

  constructor(port: string, ds: DataSource, mocks = false) {
    if (port == null || port === '') {
      throw new Error('invalid port param');
    }
    this.port = port;

    if (ds == null) {
      throw new Error('invalid ds param');
    }

    this.ds = ds;
    this.mocks = mocks;
  }

  async setup(): Promise<void> {
    // define schema using the resolvers
    const schema = await buildSchema({
      resolvers,
      // automatically create `schema.gql` file with schema definition in current folder
      emitSchemaFile: path.resolve(__dirname, 'schema.gql'),
    });

    const { NODE_ENV } = process.env;
    const isDev = NODE_ENV === 'development';

    // Set up Apollo Server
    this.server = new ApolloServer({
      cors: {
        origin: '*',
      },
      mocks: this.mocks ?
        {
          String: () => 'Hello World',
          DateTime: () => new Date(),
          Boolean: () => true,
        } :
        false,
      schema,
      // the function that sets up the global context for each resolver, using the req
      context: async ({ req }) => {
        try {
          // get token from header
          const { authorization } = req.headers;

          // check if authorization header are defined
          if (authorization == null) {
            throw new Error('undefined authorization header');
          }

          // check if autorization header is a valid token
          if (!authorization.startsWith('Bearer ')) {
            throw new Error('invalid authorization header');
          }

          // get user using token
          const user = await this.ds.user;

          return <Context>{
            user,
            datasource: this.ds,
          };
        } catch (err) {
          // Logger.warn(err.message)

          return <Context>{
            user: null,
            datasource: this.ds,
          };
        }
      },
      introspection: isDev,
      playground: isDev,
      engine: {
        debugPrintReports: isDev,
      },
    });

    this.isConfigured = true;
  }

   // start method is a reponsible to start listening to the server
   async start(): Promise<void> {
    if (!this.isConfigured) {
      throw new Error("server isn't configured yet");
    }

    await this.server.listen({
      port: this.port,
    });
  }

  // start method is a reponsible to stop the server
  async stop(): Promise<void> {
    try {
      if (!this.isConfigured) {
        throw new Error("server isn't configured yet");
      }

      await this.server.stop();
    } catch (err) {
      console.log('error in ApolloServer.stop()', err);
    }
  }
}

/*

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

*/
