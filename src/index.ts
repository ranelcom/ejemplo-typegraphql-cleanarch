import 'module-alias/register';
import Server from '@infrastructure/apollo';
// Application dependencies
import { IHTTPServer } from '@interface/http';
import { TypeORMConnection, TypeORMUserAdapter } from '@adapter/typeorm';
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
  console.log('Conectando TypeORMConnection');
  const typeormConnection = new TypeORMConnection();
  await typeormConnection.connect();
  console.log('Listo TypeORMConnection');

  console.log('Configurando TypeORMUserAdapter');
  const userStorageAdapter = new TypeORMUserAdapter(
    typeormConnection,
  );
  await userStorageAdapter.setup();
  console.log('Listo TypeORMUserAdapter');

  /*
  const datasource: DataSource = {
    user: new User(typeormConnection.getConnection()),
  };
  */

  /*
  server = await configServer(4000, datasource);
  */
  console.log('Creando UserUseCase');
  const userUseCase = new UserUseCase(userStorageAdapter);
  console.log('Listo UserUseCase');

  console.log('Creando DataSource');
  const datasource: DataSource = {
    user: userUseCase,
  };
  console.log('Listo DataSource');

  server = new Server(PORT, datasource);
  await server.setup();
  await server.start();
  console.info(`🚀 app running at port: ${PORT}`);

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
