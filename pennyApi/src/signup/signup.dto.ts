import { IsString, IsNotEmpty } from 'class-validator';

export class signupDTO {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  email: string;
}