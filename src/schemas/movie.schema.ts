import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, ObjectId, Schema as MongooseSchema, Types } from 'mongoose';
import { Director } from './director.schema';
import { Studio } from './studio.schema';

export type MovieDocument = Movie & Document;

@Schema()
export class Movie {
  @Prop({ type: String, unique: true })
  name: string;

  @Prop({ type: MongooseSchema.Types.ObjectId , ref: 'Director' })
  director: ObjectId

  @Prop({ type: MongooseSchema.Types.ObjectId , ref: 'Studio' })
  studios: ObjectId

  @Prop({ type: Number, default: 0 })
  duration: number;

  @Prop({ type: String, default: null })
  description: string;

  _id: string;
}

export const MovieSchema = SchemaFactory.createForClass(Movie);
