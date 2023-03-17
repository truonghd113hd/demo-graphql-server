import { Directive, Field, ID, ObjectType } from '@nestjs/graphql';

@ObjectType({ description: 'director' })
export class Director {
  @Field(() => ID)
  _id: string;

  // @Directive()
  @Field()
  name: string;

  @Field({ nullable: true })
  info?: string;
}