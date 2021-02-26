import { Transform } from 'class-transformer';
import { IsNumber, IsOptional } from 'class-validator';

// order by date by default.
// may add other supports if we get user to use our app
export class SolutionsQueryDto {
  @IsOptional()
  @Transform(({ value }) => {
    const offset = parseInt(value);
    return isNaN(offset) ? 0 : Math.max(offset, 0);
  })
  @IsNumber()
  offset?: number;

  @IsOptional()
  @Transform(({ value }) => {
    const limit = parseInt(value);
    return isNaN(limit) ? 5 : Math.min(Math.max(limit, 5), 100);
  })
  @IsNumber()
  limit?: number;
}
