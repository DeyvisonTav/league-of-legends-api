//@ts-nocheck
import { InMemoryUsersRepository } from '../repositories/in-memory-users-repositories';
import { UpdateUserCredentialsUseCase } from './update-user-credentials';
import { hash } from 'bcrypt';

let usersRepository: InMemoryUsersRepository;
let sut: UpdateUserCredentialsUseCase;

describe('Update User Credentials', () => {
  beforeEach(() => {
    usersRepository = new InMemoryUsersRepository();
    sut = new UpdateUserCredentialsUseCase(usersRepository);
  });

  it('should be able to update user credentials', async () => {
    const createdUser = await usersRepository.create({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password_hash: await hash('123456', 6),
    });
    const name = 'newName';
    const email = 'new@example.com';
    const password = 'newPassword';

    const { user } = await sut.execute({
      userId: createdUser.id,
      name: name,
      email: email,
      password: password,
    });
    expect(user.name).toEqual('newName');
    expect(user.password_hash).toEqual(expect.any(String));
    expect(user.email).toEqual('new@example.com');
  });

  it('should not be able to get user with wrong id', async () => {
    await expect(() =>
      sut.execute({
        userId: 'non-existing-id',
      }),
    ).rejects.toBeInstanceOf(Error);
  });
});
