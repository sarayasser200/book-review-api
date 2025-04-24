import { Field, Int, ObjectType } from '@nestjs/graphql';
import { Book } from 'src/book/book.entity';
import { User } from 'src/user/user.entity';
import { Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToOne, OneToOne } from 'typeorm';
@ObjectType()
@Entity()
export class Review {

  @Field(() => Int)
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column('text')
  comment: string;

  @Field()
  @Column({ type: 'float', nullable: true })
  rating?: number;

  @Field(() => Book)
  @ManyToOne(() => Book, book => book.reviews, { eager: true })
  book: Book;

  @Field(() => User)
  @ManyToOne(() => User, user => user.reviews, { eager: true })
  user: User;
}
