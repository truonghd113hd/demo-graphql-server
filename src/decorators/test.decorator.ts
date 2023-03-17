import { InputType, Field, Int } from '@nestjs/graphql';

@InputType()
export class MovieInput {
  @Field()
  name: string;

  @Field({nullable: true})
  description?: string;

  @Field()
  director: string;

  @Field()
  studios: string;

  @Field(() => Int)
  duration: number;
}

@InputType()
export class DirectorInput {
  @Field()
  name: string;

  @Field({nullable: true})
  info?: string;
}

@InputType()
export class StudioInput {
  @Field()
  name: string;

  @Field({nullable: true})
  info?: string;
}