import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { CreateUserInput } from 'src/dtos/user.input';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {}

  async getUsers(): Promise<User[]> {
    return this.userRepository.find(); // Fetch all users
  }

  async getUserById(id: number)  {
    return this.userRepository.findOne({
        where:{id}
    }); 
  }
  async createUser(input: CreateUserInput): Promise<User> {
    const newUser = this.userRepository.create(input); // Create a new user entity
    return this.userRepository.save(newUser); // Save it to the database
  }

  async findByEmail(email: string) {
    return this.userRepository.findOne({ where: { email } });
  }
}
