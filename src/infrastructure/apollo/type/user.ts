import 'reflect-metadata';
import { Field, ObjectType, ID } from 'type-graphql';
import { PrimaryGeneratedColumn } from 'typeorm';

@ObjectType({ description: 'Object representing a user' })
export class UserType {
  @Field(() => ID)
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Field()
  firstName: string;

  @Field()
  lastName: string;

  @Field()
  email: string;

  @Field()
  password: string;
}
