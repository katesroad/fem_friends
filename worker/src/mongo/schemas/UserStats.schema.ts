import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type UserStatsDoc = UsersStats & Document;

@Schema({ versionKey: false })
export class UsersStats {
  @Prop()
  paidUsers: number;

  @Prop()
  totalUsers: number;

  @Prop()
  statsAt: number;
}

export const UserstatsSchema = SchemaFactory.createForClass(UsersStats);
