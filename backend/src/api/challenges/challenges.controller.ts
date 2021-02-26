import { Controller, Get, Param, Query } from '@nestjs/common';
import { ChallengesService } from './challenges.service';
import { SolutionsQueryDto } from './dto/solutions-query.dto';

@Controller('v1/challenges')
export class ChallengesController {
  constructor(private readonly challengesService: ChallengesService) {}

  @Get()
  getAllChallenges() {
    return this.challengesService.getAllChallenges();
  }

  @Get(':id')
  getChallengeByFemId(@Param('id') id: string) {
    return this.challengesService.getChallengeByFemId(id);
  }

  @Get(':id/solutions')
  getChallengesSolutions(
    @Param('id') id: string,
    @Query() queryDto: SolutionsQueryDto,
  ) {
    return this.challengesService.getChallengesSolutions(id, queryDto);
  }
}
