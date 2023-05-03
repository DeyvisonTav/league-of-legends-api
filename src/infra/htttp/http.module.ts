import { Module } from '@nestjs/common';
import { DatabaseModule } from '../database/database.module';

import { AuthenticateUseCase } from 'src/application/use-cases/authenticate';
import { UserController } from './controllers/user.controller';
import { GetUserProfileUseCase } from 'src/application/use-cases/get-user-profile';
import { RegisterUseCase } from 'src/application/use-cases/register';
@Module({
  imports: [DatabaseModule],
  controllers: [UserController],
  providers: [AuthenticateUseCase, GetUserProfileUseCase, RegisterUseCase],
})
export class HttpModule {}
