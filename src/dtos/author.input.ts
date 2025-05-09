// src/dtos/author.input.ts
import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class CreateAuthorInput {
  @Field()
  name: string;
}
