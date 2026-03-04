import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service.js';
import * as bcrypt from 'bcrypt';

type authInput = {
  email: string;
  password: string;
};

@Injectable()
export class AuthService {
	constructor(private readonly usersService: UsersService) {}

	async authenticate(input: authInput) {
		const user = await this.usersService.findOne(input.email);
		if (!user) {
			return null;
		}
		const isPasswordValid = await bcrypt.compare(input.password, user.password);
		if (!isPasswordValid) {
			return null;
		}
		return user;
	}


}
