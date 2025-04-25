import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Book } from './book.entity';
import { CreateBookInput } from 'src/dtos/book.input';
import { Author } from 'src/author/author.entity';

@Injectable()
export class BookService {
  constructor(
    @InjectRepository(Book) private bookRepository: Repository<Book>,
    @InjectRepository(Author) private authorRepository: Repository<Author>,
  ) {}

  async getBooks(page: number, limit: number): Promise<Book[]> {
    const skip = (page - 1) * limit; 

    return this.bookRepository.find({
      skip,  
      take: limit,  
    });
  }

  async getBookById(id: number) {
    return this.bookRepository.findOne({
      where: { id },
      relations: ['reviews'],
    });
  }

  async createBook(input: CreateBookInput): Promise<Book> {
    const author = await this.authorRepository.findOneBy({ id: input.authorId });
  if (!author) throw new Error('Author not found');

  const book = this.bookRepository.create({
    ...input,
    author,
  });

  return this.bookRepository.save(book);
  }
}
