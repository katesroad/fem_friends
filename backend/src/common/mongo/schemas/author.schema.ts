import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type AuthorDoc = Author & Document;

@Schema({ versionKey: true })
export class Author {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  username: string;

  @Prop({ required: true })
  avatar: string;

  @Prop()
  github: string;

  @Prop({ default: false })
  proUser: boolean;

  @Prop()
  createdAt: number;

  @Prop()
  updatedAt: number;

  @Prop()
  location: string;
}

export const AuthorSchema = SchemaFactory.createForClass(Author);
