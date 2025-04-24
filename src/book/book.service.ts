import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Book } from './book.entity';
import { CreateBookInput } from 'src/dtos/book.input';

@Injectable()
export class BookService {
  constructor(
    @InjectRepository(Book) private bookRepository: Repository<Book>,
  ) {}

  async getBooks(): Promise<Book[]> {
    return this.bookRepository.find(); // Fetch all books
  }

  async getBookById(id: number) {
    return this.bookRepository.findOne({
      where: { id },
      relations: ['reviews'],
    });
  }

  async createBook(input: CreateBookInput): Promise<Book> {
    const newBook = this.bookRepository.create(input); // Create a new book entity
    return this.bookRepository.save(newBook); // Save it to the database
  }
}
