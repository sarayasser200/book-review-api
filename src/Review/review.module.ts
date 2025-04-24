import { Module } from '@nestjs/common';
import { ReviewService } from './review.service';
import { ReviewResolver } from './review.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Review } from './review.entity';
import { BookModule } from 'src/book/book.module';
import { UserModule } from 'src/user/user.module'; 
import { Book } from 'src/book/book.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Review ]), BookModule, UserModule],
  providers: [ReviewService, ReviewResolver],
})
export class ReviewModule {}
