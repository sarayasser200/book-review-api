import { InputType, Field, Int } from '@nestjs/graphql';

@InputType()
export class CreateBookInput {
  @Field()
  title: string;

  @Field(() => Int)
  authorId: number;

  @Field()
  description: string;
}
