import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async createUser(name: string, email: string, password: string): Promise<User> {
    const user = new User();
    user.name = name;
    user.email = email;
    user.password = password;
    await user.hashPassword();
    return this.usersRepository.save(user);
  };
  
  async findUserById(id: number): Promise<User | null> {
    return this.usersRepository.findOne({where: {id}});
  };

  async findUserByEmail(email: string): Promise<User | null> {
    return this.usersRepository.findOne({where: {email}});
  };
}
