import 'reflect-metadata';
import { TypeORMConnection, TypeORMUserAdapter } from '@adapter/typeorm';
import Server from '@infrastructure/apollo';
// Application dependencies
import { IHTTPServer } from '@interface/http';
import UserUseCase from './application/user-case/user';
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

let server: IHTTPServer;

const main = async () => {
  const typeormConnection = new TypeORMConnection();
  await typeormConnection.connect();

  const userStorageAdapter = new TypeORMUserAdapter(
    typeormConnection,
  );
  await userStorageAdapter.setup();

  /*
  const datasource: DataSource = {
    user: new User(typeormConnection.getConnection()),
  };
  */

  /*
  server = await configServer(4000, datasource);
  */
  const userUseCase = new UserUseCase(userStorageAdapter);

  const datasource: DataSource = {
    user: userUseCase,
  };

  server = new Server('4000', datasource);

  // server = new Server(4000, datasource);
};

const signCallback = async () => {
  console.log('SIGN received');

  try {
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
