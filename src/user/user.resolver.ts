import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { User } from './user.entity';
import { CreateUserInput } from 'src/dtos/user.input';
import { UserService } from './user.service'; // Import the UserService

@Resolver(() => User)
export class UserResolver {
  constructor(private userService: UserService) {}

  @Query(() => [User])
  async getUsers(): Promise<User[]> {
    return this.userService.getUsers(); 
  }

  @Query(() => User, { nullable: true })
  async getUserById(@Args('id', { type: () => Int }) id: number) {
    return this.userService.getUserById(id); 
  }

  @Mutation(() => User)
  async createUser(@Args('input') input: CreateUserInput): Promise<User> {
    return this.userService.createUser(input); 
  }
}
