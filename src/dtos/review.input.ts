import { InputType, Field, Int } from '@nestjs/graphql';

@InputType()
export class CreateReviewInput {
  @Field()
  comment: string;

  @Field(() => Int)
  rating: number;

  @Field(() => Int)
  bookId: number; 
}
