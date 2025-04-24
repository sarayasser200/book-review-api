import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { Review } from './review.entity';
import { ReviewService } from './review.service';
import { CreateReviewInput } from 'src/dtos/review.input';

@Resolver(() => Review)
export class ReviewResolver {
  constructor(private reviewService: ReviewService) {}

  @Query(() => [Review])
  async getReviewsByBook(@Args('bookId') bookId: number): Promise<Review[]> {
    return this.reviewService.getReviewsByBook(bookId);
  }

  @Mutation(() => Review)
  async createReview(
    @Args('input') input: CreateReviewInput,
    @Args('userId') userId: number, 
  ): Promise<Review> {
    return this.reviewService.createReview(input, userId);
  }
}
