import { Injectable } from '@nestjs/common';
import { UsersRepository } from '../repositories/user-repositories';
import { User } from '@prisma/client';

interface GetUserProfileUseCaseRequest {
  userId: string;
}

export interface GetUserProfileUseCaseResponse {
  user: User;
}
@Injectable()
export class GetUserProfileUseCase {
  constructor(private usersRepository: UsersRepository) {}

  async execute({
    userId,
  }: GetUserProfileUseCaseRequest): Promise<GetUserProfileUseCaseResponse> {
    const user = await this.usersRepository.findById(userId);

    if (!user) {
      throw new Error();
    }

    return {
      user,
    };
  }
}
