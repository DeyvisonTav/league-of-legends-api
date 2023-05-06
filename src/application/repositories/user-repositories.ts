import { Prisma, User } from '@prisma/client';

export abstract class UsersRepository {
  abstract update(user: User): Promise<User>;
  abstract findById(id: string): Promise<User | null>;
  abstract findByEmail(email: string): Promise<User | null>;
  abstract create(data: Prisma.UserCreateInput): Promise<User>;
  abstract delete(user: User): Promise<void>;
}
