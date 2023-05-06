import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  Put,
  Delete,
} from '@nestjs/common';
import { RegisterUseCase } from 'src/application/use-cases/register';
import { GetUserProfileUseCase } from 'src/application/use-cases/get-user-profile';
import { RegisterUserBody } from '../dtos/create-user-body';
import { RegisterUseCaseResponse } from 'src/application/use-cases/register';
import { GetUserProfileUseCaseResponse } from 'src/application/use-cases/get-user-profile';
import { AuthenticateUseCase } from 'src/application/use-cases/authenticate';
import { AuthenticateUserBody } from '../dtos/authenticate-user-body';
import { AuthenticateUseCaseResponse } from 'src/application/use-cases/authenticate';
import { UpdateUserCredentialsUseCase } from 'src/application/use-cases/update-user-credentials';
import { UpdateUserCredentialsResponse } from 'src/application/use-cases/update-user-credentials';
import { DeleteUserUseCase } from 'src/application/use-cases/delete-user';
@Controller('user')
export class UserController {
  constructor(
    private delteUser: DeleteUserUseCase,
    private userUpdateCredentials: UpdateUserCredentialsUseCase,
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

  @Put(':userId')
  async updateUserCredentials(
    @Param('userId') userId: string,
    @Body() body: { name: string; email: string; password: string },
  ): Promise<UpdateUserCredentialsResponse> {
    const { name, email, password } = body;
    const response = await this.userUpdateCredentials.execute({
      userId,
      name,
      email,
      password,
    });

    return response;
  }

  @Delete(':userId')
  async deleteUser(@Param('userId') userId: string): Promise<void> {
    await this.delteUser.execute({
      userId,
    });
  }
}
