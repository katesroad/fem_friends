import { Body, Controller, Param, Post } from '@nestjs/common';
import { SolutionsService } from './solutions.service';

@Controller('/v1/solutions')
export class SolutionsController {
  constructor(private readonly solutionsService: SolutionsService) {}

  @Post(':id')
  rateSolution(@Param('id') id: string, @Body() rate) {
    return this.solutionsService.rateSolution(id, rate);
  }
}
