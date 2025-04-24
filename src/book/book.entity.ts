import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Review } from 'src/Review/review.entity';
import { Field, Int, ObjectType } from '@nestjs/graphql';
@ObjectType()
@Entity()
export class Book {

  @Field(() => Int)
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column()
  title: string;

  @Field()
  @Column()
  author: string;

  @Field()
  @Column('text')
  description: string;

  @Field()
  @Column({ type: 'float', nullable: true })
  rating?: number;

  @OneToMany(() => Review, (review) => review.book)
  reviews: Review[];
  
}
