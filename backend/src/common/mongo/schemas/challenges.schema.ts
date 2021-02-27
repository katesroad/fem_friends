import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type ChallengeDoc = Challenge & Document;
@Schema({ versionKey: false })
export class Challenge {
  @Prop()
  type: string;

  // how many solutions are there
  @Prop({ default: 0 })
  solutions: number;

  @Prop()
  languages: string[];

  @Prop()
  title: string;

  @Prop()
  description: string;

  @Prop()
  difficulty: number;

  @Prop()
  slug: string;

  @Prop()
  createdAt: number;

  @Prop()
  updatedAt: number;

  @Prop()
  crawledAt: string;

  @Prop()
  heroImg: string;
}

export const ChallengeSchema = SchemaFactory.createForClass(Challenge);
