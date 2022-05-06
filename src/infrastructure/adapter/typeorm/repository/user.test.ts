import UserInput from '../../../../domain/user-input';
import UserTypeORMAdapter from './user';
import MockConnection from '../connection.mock';
import UserModel from '../entity/user';

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

          const userModel = new UserModel();
          // Initialize typeorm connection.
          const typeormConnection = new MockConnection('fake_id', {
              save: () => {
                userModel.id = 'fake_id';
                userModel.firstName = mockUserInput.firstName;
                userModel.lastName = mockUserInput.lastName;
                userModel.email = mockUserInput.email;
                userModel.password = mockUserInput.password;
                return userModel;
              },
          });
          await typeormConnection.connect();

          const userTypeOrm = new UserTypeORMAdapter(typeormConnection);
          await userTypeOrm.setup();

          const usuario = await userTypeOrm.create(mockUserInput);
          // Test.
          expect(usuario.firstName).toBe(mockUserInput.firstName);
          expect(usuario.lastName).toBe(mockUserInput.lastName);
          expect(usuario.password).toBe(mockUserInput.password);
        });
      });
    });
  });
});
