import { Directive, Field, ID, Int, ObjectType } from '@nestjs/graphql';
import { Director } from './director.model';
import { Studios } from './studios.model';

@ObjectType({ description: 'movie' })
export class Movie {
  @Field(() => ID)
  _id: string;

  @Field()
  name: string;

  @Field(() => Studios)
  studios: Studios;

  @Field(() => Director)
  director: Director;

  @Field(() => Int)
  duration: number;

  @Field({ nullable: true })
  description?: string;
}