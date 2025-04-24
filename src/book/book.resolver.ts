import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { Book } from './book.entity';
import { BookService } from './book.service';
import { CreateBookInput } from 'src/dtos/book.input';

@Resolver(() => Book)
export class BookResolver {
  constructor(private bookService: BookService) {}

  @Query(() => [Book])
  async getBooks(): Promise<Book[]> {
    return this.bookService.getBooks(); // Get all books
  }

  @Query(() => Book, { nullable: true })
  async getBookById(@Args('id') id: number){
    return this.bookService.getBookById(id); // Get book by id
  }

  @Mutation(() => Book)
  async createBook(@Args('input') input: CreateBookInput): Promise<Book> {
    return this.bookService.createBook(input); // Create a new book
  }
}
