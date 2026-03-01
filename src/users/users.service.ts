import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service.js';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  findAll() {
    return this.prisma.user.findMany();
  }

  findOne(id: number) {
    return this.prisma.user.findUnique({
      where: {
        id,
      },
    });
  }

  updateUser(id: number, data: any) {
    const user = this.prisma.user.update({
      where: {
        id,
      },
      data,
    });

    if (!user) {
      return null;
    }

    return user;
  }

  deleteUser(id: number) {
    const user = this.prisma.user.delete({
      where: {
        id,
      },
    });

    if (!user) {
      return null;
    }

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
    const { password, ...result } = user;
    return result;
  }
}
