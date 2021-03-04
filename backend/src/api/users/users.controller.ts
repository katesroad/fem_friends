import { Controller, Get, Param } from '@nestjs/common';
import { UsersService } from './users.service';

@Controller('v1/users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get('stats')
  getUserStats() {
    return this.usersService.getUsersStats();
  }

  @Get(':id/solutions')
  getUsersSolutions(@Param('id') id: string) {
    return this.usersService.getUsersSolutions(id);
  }
}
