import { UsersRepository } from 'src/application/repositories/user-repositories';
import { PrismaService } from '../prisma.service';
import { Prisma, User } from '@prisma/client';
import { Injectable } from '@nestjs/common';

@Injectable()
export class PrismaUsersRepository implements UsersRepository {
  constructor(private prisma: PrismaService) {}

  async delete(user: User): Promise<void> {
    const { id } = user;
    await this.prisma.user.delete({
      where: {
        id,
      },
    });
  }

  async update(user: User): Promise<User> {
    const { name, id, email, password_hash } = user;
    const updatedUser = await this.prisma.user.update({
      where: {
        id,
      },
      data: {
        name,
        email,
        password_hash,
      },
    });
    return updatedUser;
  }
  async findById(id: string): Promise<User | null> {
    const user = await this.prisma.user.findUnique({
      where: {
        id,
      },
    });

    return user;
  }

  async findByEmail(email: string) {
    const user = await this.prisma.user.findUnique({
      where: {
        email,
      },
    });

    return user;
  }

  async create(data: Prisma.UserCreateInput) {
    const user = await this.prisma.user.create({
      data,
    });

    return user;
  }
}
