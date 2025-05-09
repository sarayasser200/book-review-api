import { Module } from '@nestjs/common';
import { BookService } from './book.service';
import { BookResolver } from './book.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Book } from './book.entity';
import { Author } from 'src/author/author.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Book,Author])],
  providers: [BookService, BookResolver],
  exports:[BookService]
})
export class BookModule {}
