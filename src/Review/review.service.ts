import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Review } from './review.entity';
import { CreateReviewInput } from 'src/dtos/review.input';
import { BookService } from 'src/book/book.service';
import { UserService } from 'src/user/user.service';

@Injectable()
export class ReviewService {
  constructor(
    @InjectRepository(Review) private reviewRepository: Repository<Review>,
    private bookService: BookService,
    private userService: UserService,
  ) {}

  async createReview (input:CreateReviewInput,userId){
    const user= await this.userService.getUserById(userId);
    const book =await this.bookService.getBookById(input.bookId);
    if (!user || !book) {
        throw new Error('User or Book not found');
    }
    const newReview=this.reviewRepository.create({
        ...input,
        user,
        book
    });
     return this.reviewRepository.save(newReview)

  }


  async getReviewsByBook(bookId: number): Promise<Review[]> {
    return this.reviewRepository.find({ where: { book: { id: bookId } }, relations: ['user'] });
  }
}
