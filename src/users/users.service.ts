import { Injectable } from '@nestjs/common';

@Injectable()
export class UsersService {
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

  createUser(data: any) {
    const user = {
      id: this.users.length + 1,
      name: data.name,
      email: data.email,
    };

    this.users.push(user);

    return user;
  }
  
}
