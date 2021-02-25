import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type CrawlerErrorDoc = CrawlerError & Document;

@Schema({
  timestamps: true,
  versionKey: false,
})
export class CrawlerError {
  @Prop({ required: true })
  error: string;

  @Prop()
  type: string;

  @Prop()
  url: string;

  @Prop()
  params?: string;
}

export const CrawlerErrorSchema = SchemaFactory.createForClass(CrawlerError);
