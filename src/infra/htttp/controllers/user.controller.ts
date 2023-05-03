import { Controller, Post, Body, Get, Param } from '@nestjs/common';
import { RegisterUseCase } from 'src/application/use-cases/register';
import { GetUserProfileUseCase } from 'src/application/use-cases/get-user-profile';
import { RegisterUserBody } from '../dtos/create-user-body';
import { RegisterUseCaseResponse } from 'src/application/use-cases/register';
import { GetUserProfileUseCaseResponse } from 'src/application/use-cases/get-user-profile';
import { AuthenticateUseCase } from 'src/application/use-cases/authenticate';
import { AuthenticateUserBody } from '../dtos/authenticate-user-body';
import { AuthenticateUseCaseResponse } from 'src/application/use-cases/authenticate';

@Controller('user')
export class UserController {
  constructor(
    private registerUser: RegisterUseCase,
    private userProfile: GetUserProfileUseCase,
    private authenticateUser: AuthenticateUseCase,
  ) {}

  @Post('register')
  async register(
    @Body() body: RegisterUserBody,
  ): Promise<RegisterUseCaseResponse> {
    const { name, email, password } = body;

    const response = await this.registerUser.execute({ name, email, password });

    return response;
  }

  @Post('authenticate')
  async authenticate(
    @Body() body: AuthenticateUserBody,
  ): Promise<AuthenticateUseCaseResponse> {
    const { email, password } = body;

    const response = await this.authenticateUser.execute({ email, password });

    return response;
  }

  @Get(':userId')
  async getUserProfile(
    @Param('userId') userId: string,
  ): Promise<GetUserProfileUseCaseResponse> {
    const response = await this.userProfile.execute({ userId });

    return response;
  }
}
