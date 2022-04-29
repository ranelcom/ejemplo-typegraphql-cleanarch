import UserInput from '../../../../domain/user-input';
import UserAdapter from './user';
import { MockConnection } from '../connection.test';
import { User } from '../entity/user';

describe('Infrastructure:', () => {
  describe('Adapter:', () => {
    describe('TypeORM:', () => {
      describe('User:', () => {
        test('Should create an user', async () => {
          const mockUserInput: UserInput = {
            firstName: 'Juan',
            lastName: 'Perez',
            email: 'email@email.com',
            password: 'laclave',
          };

          // Initialize typeorm connection.
          const typeormConnection = new MockConnection({
              create: (mockUserInput) => User,
          });
          await typeormConnection.connect();

          const conn = await typeormConnection.getConnection();
          const userTypeOrm = new UserAdapter(conn);

          const usuario: User = await userTypeOrm.create(mockUserInput);

          // Test.
          expect(usuario.id).toBeDefined();
          expect(usuario.firstName).toBe(mockUserInput.firstName);
          expect(usuario.lastName).toBe(mockUserInput.lastName);
          expect(usuario.password).toBe(mockUserInput.password);
        });
      });
    });
  });
});
