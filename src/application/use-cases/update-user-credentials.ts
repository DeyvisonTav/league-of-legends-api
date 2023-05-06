import { Injectable } from '@nestjs/common';
import { UsersRepository } from '../repositories/user-repositories';
import { User } from '@prisma/client';
import { hash } from 'bcrypt';

interface UpdateUserCredentialsRequest {
  userId: string;
  name?: string;
  email?: string;
  password?: string;
}

export interface UpdateUserCredentialsResponse {
  user: User;
}

@Injectable()
export class UpdateUserCredentialsUseCase {
  constructor(private usersRepository: UsersRepository) {}

  async execute({
    userId,
    name,
    email,
    password,
  }: UpdateUserCredentialsRequest): Promise<UpdateUserCredentialsResponse> {
    const user = await this.usersRepository.findById(userId);

    if (!user) {
      throw new Error('User not found');
    }
    if(name) {
      user.name = name;
    }

    if (email) {
      user.email = email;
    }
    if (password) {
      const password_hash = await hash(password, 6);
      user.password_hash = password_hash;
    }

    const updatedUser = await this.usersRepository.update(user);

    return {
      user: updatedUser,
    };
  }
}
