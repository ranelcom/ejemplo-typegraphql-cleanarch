import User from '@domain/user';
import UserInput from '@domain/user-input';
import UserUseCase from '.';
import MockUserAdapter from '../../mock/user/adapter';

describe('Application Layer:', () => {
    describe('Use Case:', () => {
        describe('User:', () => {
            test('Create:', async () => {
              // Mock user
              const userMock: UserInput = {
                  firstName: 'fake_user_name',
                  lastName: 'fake_last_name',
                  email: 'fake_email',
                  password: 'fake_password',
              };
              const mockUserAdapter = new MockUserAdapter(userMock, null);
              const useCase = new UserUseCase(mockUserAdapter);
              const user: User = await useCase.create(userMock);
              expect(user.id).toBeDefined();
              expect(user.email).toBe(userMock.email);
              expect(user.firstName).toBe(userMock.firstName);
              expect(user.lastName).toBe(userMock.lastName);
              expect(user.password).toBe(userMock.password);
            });

            test('Invalid adapter:', async () => {
                expect(() => {
                    const useCase = new UserUseCase(null);
                    return useCase;
                }).toThrowError('User adapter is not valid');
            });
        });
    });
});
