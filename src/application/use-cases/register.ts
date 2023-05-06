import { Injectable } from '@nestjs/common';
import { UsersRepository } from '../repositories/user-repositories';
import { User } from '@prisma/client';
import { hash } from 'bcrypt';

interface RegisterUseCaseRequest {
  name: string;
  email: string;
  password: string;
}

export interface RegisterUseCaseResponse {
  user: User;
}
@Injectable()
export class RegisterUseCase {
  constructor(private usersRepository: UsersRepository) {}

  async execute({
    name,
    email,
    password,
  }: RegisterUseCaseRequest): Promise<RegisterUseCaseResponse> {
    if (password.length <= 5) {
      throw new Error();
    }

    const password_hash = await hash(password, 6);

    const userWithSameEmail = await this.usersRepository.findByEmail(email);

    if (userWithSameEmail) {
      throw new Error();
    }

    const user = await this.usersRepository.create({
      name,
      email,
      password_hash,
    });

    return {
      user,
    };
  }
}
