  import { IsNotEmpty, IsUUID } from 'class-validator';

  export class RegisterUserBody {
    @IsNotEmpty()
    @IsUUID()
    name: string;

    @IsNotEmpty()
    email: string;

    @IsNotEmpty()
    password: string;
  }
