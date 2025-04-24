// src/user/user.entity.ts
import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Review } from 'src/Review/review.entity';
import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';

@ObjectType() // For GraphQL
@Entity()     // For TypeORM/PostgreSQL
export class User {
  @Field(() => Int)
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column()
  username: string;

  @Field({ nullable: true })
  @Column({ nullable: true })
  displayName?: string;

  @OneToMany(() => Review, (review) => review.user)
  reviews: Review[];
}
