//@ts-nocheck
import { InMemoryUsersRepository } from '../repositories/in-memory-users-repositories';
import { DeleteUserUseCase } from './delete-user';

let usersRepository: InMemoryUsersRepository;
let sut: DeleteUserUseCase;

describe('Update User Credentials', () => {
  beforeEach(() => {
    usersRepository = new InMemoryUsersRepository();
    sut = new DeleteUserUseCase(usersRepository);
  });

  it('should be able to delete user', async () => {
    const createdUser = await usersRepository.create({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password_hash: '123123',
    });

    await sut.execute({
      userId: createdUser.id,
    });
    expect(usersRepository.items).toHaveLength(0);
  });

  it('should not be able to get user with wrong id', async () => {
    await expect(() =>
      sut.execute({
        userId: 'non-existing-id',
      }),
    ).rejects.toBeInstanceOf(Error);
  });
});
