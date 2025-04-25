import { Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToOne, JoinColumn } from 'typeorm';
import { Review } from 'src/Review/review.entity';
import { Field, Int, ObjectType } from '@nestjs/graphql';
import { Author } from 'src/author/author.entity';
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
  @Column('text')
  description: string;

  @Field()
  @Column({ type: 'float', nullable: true })
  rating?: number;

  @OneToMany(() => Review, (review) => review.book)
  reviews: Review[];

  @Field(() => Author, { nullable: true }) 
  @ManyToOne(() => Author, (author) => author.books, { nullable: true })
  @JoinColumn({ name: 'authorId' })
  author: Author;
}
