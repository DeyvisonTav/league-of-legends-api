import { Injectable } from '@nestjs/common';
import { UsersRepository } from '../repositories/user-repositories';
import { User } from '@prisma/client';
import { compare } from 'bcrypt';

interface AuthenticateUseCaseRequest {
  email: string;
  password: string;
}

export interface AuthenticateUseCaseResponse {
  user: User;
}
@Injectable()
export class AuthenticateUseCase {
  constructor(private usersRepository: UsersRepository) {}

  async execute({
    email,
    password,
  }: AuthenticateUseCaseRequest): Promise<AuthenticateUseCaseResponse> {
    const user = await this.usersRepository.findByEmail(email);

    if (!user) {
      throw new Error();
    }

    const doestPasswordMatches = await compare(password, user.password_hash);

    if (!doestPasswordMatches) {
      throw new Error();
    }

    return {
      user,
    };
  }
}
