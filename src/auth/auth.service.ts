import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service.js';
import * as bcrypt from 'bcrypt';
import { LoginDto } from './dto/login.dto.js';
import { RegisterDto } from './dto/register.dto.js';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async authenticate(data: LoginDto) {
    const user = await this.usersService.findOneByEmailOrUsername(
      data.identifier,
    );
    if (!user) {
      throw new UnauthorizedException('Invalid username or email');
    }
    const isPasswordValid: boolean = await bcrypt.compare(
      data.password,
      user.password,
    );
    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid password');
    }
    const { password, ...result } = user;

    const payload = {
      sub: user.id,
      username: user.username,
      email: user.email,
    };

    // generate jwt token. @TODO implement jwt token generation.
    const token = await this.jwtService.sign(payload);
    return {
      result,
      accessToken: token,
    };
  }

  async register(data: RegisterDto) {
    const user = await this.usersService.createUser(data);
    return user;
  }
}
