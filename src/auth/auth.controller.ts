import { Controller, Post, Body, HttpCode, HttpStatus } from '@nestjs/common';
import { AuthService } from './auth.service.js';
import { LoginDto } from './dto/login.dto.js';
import { RegisterDto } from './dto/register.dto.js';

@Controller('auth')
export class AuthController {
	constructor(private readonly authService: AuthService) {}

	@Post('/register')
	@HttpCode(HttpStatus.CREATED)
	async register(@Body() data: RegisterDto) {
		return this.authService.register(data);
	}

	@Post('/login')
	@HttpCode(HttpStatus.OK)
	async login(@Body() data: LoginDto) {
		return this.authService.authenticate(data);
	}
}
