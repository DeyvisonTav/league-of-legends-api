import { Injectable } from '@nestjs/common';
import { UsersRepository } from '../repositories/user-repositories';
import { User } from '@prisma/client';
import { hash } from 'bcrypt';

interface DeleteUserUseCaseRequest {
  userId: string;
}

export interface DeleteUserUseCaseResponse {}

@Injectable()
export class DeleteUserUseCase {
  constructor(private usersRepository: UsersRepository) {}

  async execute({
    userId,
  }: DeleteUserUseCaseRequest): Promise<DeleteUserUseCaseResponse> {
    const user = await this.usersRepository.findById(userId);

    if (!user) {
      throw new Error('User not found');
    }

    await this.usersRepository.delete(user);

    return {};
  }
}
