import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service.js';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  findAll() {
    return this.prisma.user.findMany();
  }

  findOneById(id: number) {
    return this.prisma.user.findUnique({
      where: {
        id,
      },
    });
  }

  findOneByEmail(email: string) {
    return this.prisma.user.findUnique({
      where: {
        email,
      },
    });
  }

  findOneByUsername(username: string) {
    return this.prisma.user.findUnique({
      where: {
        username,
      },
    });
  }

  // for login user can input either username or email, search by both and find first.
  findOneByEmailOrUsername(identifier: string) {
    return this.prisma.user.findFirst({
      where: {
        OR: [
          { email: identifier },
          { username: identifier },
        ]
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
    const existingUser = await this.prisma.user.findFirst({
      where: {
        OR: [
          { email: data.email },
          { username: data.username },
        ]
      },
    });

    if (existingUser) {
      if (existingUser.email === data.email) {
        throw new Error('Email already exists');
      }
      if (existingUser.username === data.username) {
        throw new Error('Username already exists');
      }
    }

    const hashedPassword = await bcrypt.hash(data.password, 10);

    const user = await this.prisma.user.create({
      data: {
        firstName: data.firstName,
        lastName: data.lastName,
        username: data.username,
        email: data.email,
        password: hashedPassword,
      },
    });
    const { password, ...result } = user;
    return result;
  }
}
