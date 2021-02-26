import { Module } from '@nestjs/common';
import { SolutionsService } from './solutions.service';
import { SolutionsController } from './solutions.controller';
import { MongoModule } from 'mongo/mongo.module';

@Module({
  imports: [MongoModule],
  controllers: [SolutionsController],
  providers: [SolutionsService],
})
export class SolutionsModule {}
