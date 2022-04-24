import 'reflect-metadata';
import { Connection } from 'typeorm';
import { ApolloServer } from 'apollo-server-express';
import { configServer } from './infrastructure/adapter/graphql/config';
import User from './infrastructure/adapter/typeorm/user';
import { connect } from './infrastructure/adapter/typeorm/connection';
import DataSource from './application/datasource';

require('dotenv').config();

const { NODE_ENV } = process.env;
if (NODE_ENV == null || NODE_ENV === '') {
  console.error('env NODE_ENV is not defined');
  process.exit(1);
}

const { PORT } = process.env;
if (PORT == null || PORT === '') {
  console.error('env PORT is not defined');
  process.exit(1);
}

let server: ApolloServer;
let dbConnection: Connection;

const main = async () => {
  dbConnection = await connect();

  const datasource: DataSource = {
    user: new User(dbConnection),
  };

  server = await configServer(4000, datasource);
};

const signCallback = async () => {
  console.log('SIGN received');

  try {
    await dbConnection.close();
    await server.stop();
  } catch (err) {
    console.log('Error while stop and halting server on SIGINT ', err);
    process.exit(1);
  }

  console.log('Gracefully shut down');
  process.exit(0);
};

process.on('SIGTERM', signCallback);
process.on('SIGINT', signCallback);
process.on('uncaughtException', (err) => {
  console.log('uncaughtException: ', err);
});

main();
