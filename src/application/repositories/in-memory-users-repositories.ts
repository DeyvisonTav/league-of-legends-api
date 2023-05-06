//@ts-nocheck
import { UsersRepository } from './user-repositories';
import { User, Prisma } from '@prisma/client';
import { randomUUID } from 'node:crypto';

export class InMemoryUsersRepository implements UsersRepository {
  public items: User[] = [];

  async findById(id: string) {
    const user = this.items.find((item) => item.id === id);

    if (!user) {
      return null;
    }

    return user;
  }

  async findByEmail(email: string) {
    const user = this.items.find((item) => item.email === email);

    if (!user) {
      return null;
    }

    return user;
  }

  async create(data: Prisma.UserCreateInput) {
    const user = {
      id: randomUUID(),
      name: data.name,
      email: data.email,
      password_hash: data.password_hash,
      created_at: new Date(),
    };

    this.items.push(user);

    return user;
  }
  async update(user: User): Promise<User> {
    const updatedUser = {
      name: user.name,
      email: user.email,
      password_hash: user.password_hash,
    };

    this.items.push(updatedUser);
    return updatedUser;
  }

  async delete(user: User): Promise<void> {
    const index = this.items.findIndex((item) => item.id === user.id);

    if (index !== -1) {
      this.items.splice(index, 1);
    }
  }
}
