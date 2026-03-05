import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service.js';

type authInput = {
  email: string;
  password: string;
};

@Controller('auth')
export class AuthController {
	constructor(private readonly authService: AuthService) {}

	@Post('register')
	async register(@Body() input: authInput) {
	}

	@Post('login')
	async login(@Body() input: authInput) {
	}
}
