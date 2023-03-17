import { Directive, Field, ID, ObjectType } from '@nestjs/graphql';

@ObjectType({ description: 'studios' })
export class Studios {
  @Field(() => ID)
  _id: string;

  // @Directive()
  @Field()
  name: string;

  @Field({ nullable: true })
  info?: string;
}