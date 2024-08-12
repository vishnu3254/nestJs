import { Injectable, NotFoundException } from '@nestjs/common';
import { UpdateUserDto } from './dto/update-user.dto';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UsersService {
  private users = [
    {
      id: 1,
      name: 'vishnu',
      email: 'abc@gmail.com',
      role: 'INTERN',
    },
    {
      id: 2,
      name: 'vardhan',
      email: 'def@gmail.com',
      role: 'ADMIN',
    },
    {
      id: 3,
      name: 'ram',
      email: 'ram@gmail.com',
      role: 'ENGINEER',
    },
    {
      id: 4,
      name: 'krish',
      email: 'krish@gmail.com',
      role: 'ADMIN',
    },
  ];

  findAll(role?: 'ADMIN' | 'INTERN' | 'ENGINEER') {
    if (role) {
      return this.users.filter((user) => user.role === role);
    }
    return this.users;
  }

  findOne(id: number) {
    const user = this.users.find((user) => user.id === id);
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return user;
  }

  create(createUserDto: CreateUserDto) {
    const highesthNumber = [...this.users].sort((a, b) => b.id - a.id);
    const newUser = {
      id: highesthNumber[0].id + 1,
      ...createUserDto,
    };
    this.users.push(newUser);
    return newUser;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    this.users = this.users.map((user) => {
      if (user.id === id) {
        return { ...user, ...updateUserDto };
      }
      return user;
    });
    return this.findOne(id);
  }

  delete(id: number) {
    const removeduser = this.findOne(id);
    this.users = this.users.filter((user) => user.id !== id);
    return removeduser;
  }
}
