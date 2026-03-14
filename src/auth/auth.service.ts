import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service.js';
import * as bcrypt from 'bcrypt';
import { LoginDto } from './dto/login.dto.js';
import { RegisterDto } from './dto/register.dto.js';

@Injectable()
export class AuthService {
  constructor(private readonly usersService: UsersService) {}

  async authenticate(data: LoginDto) {
    const user = await this.usersService.findOneByEmailOrUsername(
      data.identifier,
    );
    if (!user) {
      throw new UnauthorizedException('Invalid username or email');
    }
    const isPasswordValid : boolean = await bcrypt.compare(data.password, user.password);
    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid password');
    }
    const { password, ...result } = user;

		// generate jwt token. @TODO implement jwt token generation.
		// const token = this.jwtService.sign(result);
    return result;
  }

	async register(data: RegisterDto) {
		const user = await this.usersService.createUser(data);
		return user;
	}
}
