// src/author/author.resolver.ts
import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { AuthorService } from './author.service';
import { Author } from './author.entity';
import { CreateAuthorInput } from 'src/dtos/author.input';

@Resolver(() => Author)
export class AuthorResolver {
  constructor(private readonly authorService: AuthorService) {}

  @Query(() => [Author])
  async getAllAuthors(
    @Args('page', { type: () => Number, defaultValue: 1 }) page: number,
    @Args('limit', { type: () => Number, defaultValue: 5 }) limit: number,
  ): Promise<Author[]> {
    return this.authorService.getAllAuthors(page, limit); // Just return the authors array
  }
  

  @Query(() => [Author])
  async findAuthorByName(@Args('name') name: string): Promise<Author[]> {
    return this.authorService.findAuthorByName(name);
  }

  @Query(() => Author, { nullable: true })
  async getAuthorById(@Args('id') id: number): Promise<Author | null> {
    return this.authorService.getAuthorById(id);
  }

  @Mutation(() => Author)
  async createAuthor(@Args('input') input: CreateAuthorInput): Promise<Author> {
    return this.authorService.createAuthor(input);
  }
}
