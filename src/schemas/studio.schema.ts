import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema, Types } from 'mongoose';

export type StudioDocument = Studio & Document;

@Schema()
export class Studio {
  @Prop({ type: String, unique: true })
  name: string;

  @Prop({ type: String, default: null })
  info: string;

  _id: string;
}

export const StudioSchema = SchemaFactory.createForClass(Studio);
