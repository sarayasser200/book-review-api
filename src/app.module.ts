import { Module } from '@nestjs/common';
import { AppService } from './app.service';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { GraphQLModule } from '@nestjs/graphql';
import { join } from 'path';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserResolver } from './user/user.resolver';
import { User } from './user/user.entity';
import { UserService } from './user/user.service';
import { BookModule } from './book/book.module';
import { ReviewModule } from './Review/review.module';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver:ApolloDriver,
      autoSchemaFile:'src/schema.gql'
    }),

    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'sara2004',
      database: 'book_review',
      autoLoadEntities: true,
      synchronize: true, // use only in development
    }),
    BookModule,
    ReviewModule,
    UserModule,
    AuthModule,
    
    
    
    TypeOrmModule.forFeature([User]),
    
    
    AuthModule,
  ],
  providers: [UserResolver, UserService],
})
export class AppModule {}
