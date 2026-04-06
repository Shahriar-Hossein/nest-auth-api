import { IsEmail, IsString, MaxLength, MinLength } from 'class-validator';

export class RegisterDto {
  @IsString()
  @MinLength(3)
  @MaxLength(255)
  firstName: string;

  @IsString()
  @MinLength(3)
  @MaxLength(255)
  lastName: string;

  @IsString()
  @MinLength(3)
  @MaxLength(255)
  username: string;

  @IsEmail()
  @MaxLength(255)
  email: string;

  @IsString()
  @MinLength(6)
  @MaxLength(255)
  password: string;
}
