// src/author/author.service.ts
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Author } from './author.entity';
import { CreateAuthorInput } from 'src/dtos/author.input';

@Injectable()
export class AuthorService {
  constructor(
    @InjectRepository(Author) private authorRepo: Repository<Author>,
  ) {}

  async createAuthor(input: CreateAuthorInput): Promise<Author> {
    const author = this.authorRepo.create(input);
    return this.authorRepo.save(author);
  }

  async getAllAuthors(page: number, limit: number) {
    const [authors] = await this.authorRepo.findAndCount({
      relations: ['books'],
      skip: (page - 1) * limit,
      take: limit,
    });
  
    return authors; // Return only the authors array, not the metadata
  }
  
  

  async findAuthorByName(name: string): Promise<Author[]> {
    return this.authorRepo.find({
      where: { name },
      relations: ['books'],
    });
  }

  async getAuthorById(id: number): Promise<Author | null> {
    return this.authorRepo.findOne({
      where: { id },
      relations: ['books'],
    });
  }
}
