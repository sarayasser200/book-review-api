import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { Review } from './review.entity';
import { ReviewService } from './review.service';
import { CreateReviewInput } from 'src/dtos/review.input';
import { UseGuards } from '@nestjs/common';
import { GqlAuthGuard } from 'src/auth/gql-auth.guard';
import { User } from 'src/user/user.entity';
import { CurrentUser } from 'src/auth/decorator/current-user.decorator';

@Resolver(() => Review)
export class ReviewResolver {
  constructor(private reviewService: ReviewService) {}

  @Query(() => [Review])
  async getReviewsByBook(@Args('bookId') bookId: number): Promise<Review[]> {
    return this.reviewService.getReviewsByBook(bookId);
  }

  @UseGuards(GqlAuthGuard)
  @Mutation(() => Review)
  async createReview(
    @Args('input') input: CreateReviewInput,
    @CurrentUser() user: User,
  ): Promise<Review> {
    // console.log(user);
    // console.log(user.id)
    // console.log(user.displayName)
    return this.reviewService.createReview(input, user.id);
  }
}
