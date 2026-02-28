import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service.js';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  private users = [
    { id: 1, name: 'John', email: 'john@test.com' },
    { id: 2, name: 'sarah', email: 'sarah@test.com' },
  ];

  findAll() {
    return this.users;
  }

  findOne(id: number) {
    return this.users.find((user) => user.id === id);
  }

  updateUser(id: number, data: any) {
    const user = this.users.find((user) => user.id === id);

    if (!user) {
      return null;
    }

    user.name = data.name;
    user.email = data.email;

    return user;
  }

  deleteUser(id: number) {
    const user = this.users.find((user) => user.id === id);

    if (!user) {
      return null;
    }

    this.users = this.users.filter((user) => user.id !== id);

    return user;
  }

  async createUser(data: any) {

    // check if user exists
    const existingUser = await this.prisma.user.findUnique({
      where: {
        email: data.email,
      },
    });

    if (existingUser) {
      throw new Error('User already exists');
    }

    const hashedPassword = await bcrypt.hash(data.password, 10);

    const user = await this.prisma.user.create({
      data: {
        name: data.name,
        email: data.email,
        password: hashedPassword,
      },
    });

    return user;
  }
  
}
