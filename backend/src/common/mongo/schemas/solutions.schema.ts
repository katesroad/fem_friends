import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { Author } from './author.schema';
import { Challenge } from './challenges.schema';

export type SolutionDoc = Solution & Document;
@Schema({ versionKey: false })
export class Solution {
  @Prop({ required: true, type: Types.ObjectId, ref: Challenge.name })
  challenge: string; //challenge's fem_id

  @Prop({ required: true, type: Types.ObjectId, ref: Author.name })
  author: string;

  // source code url
  @Prop({ required: true })
  repoURL: string;

  // online preview url
  @Prop({ required: true })
  liveURL: string;

  // when this soultion being created
  @Prop({ required: true })
  submittedAt: number;

  @Prop({ required: true })
  createdAt: number;

  @Prop({ required: true })
  updatedAt: number;

  @Prop({ default: 0 })
  like: number;

  @Prop({ default: 0 })
  dislike: number;

  // ie.react, angular, vallina javascript, etc
  @Prop()
  stacks?: string[];

  @Prop({ default: 0 })
  views: number;
}

export const SolutionSchema = SchemaFactory.createForClass(Solution);
