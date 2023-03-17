import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema, Types } from 'mongoose';

export type DirectorDocument = Director & Document;

@Schema()
export class Director {
  @Prop({ type: String, unique: true })
  name: string;

  @Prop({ type: String, default: null })
  info: string;

  _id: string;
}

export const DirectorSchema = SchemaFactory.createForClass(Director);
