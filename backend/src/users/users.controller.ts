import { Controller, Get, Patch, Param, Delete, UseGuards, Body, Query } from '@nestjs/common';
import { UsersService } from './users.service';
import { UpdateUserDto } from './dto/update-user.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@Controller('users')
@UseGuards(JwtAuthGuard)
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  async findAll(@Query('skip') skip?: string, @Query('take') take?: string) {
    const users = await this.usersService.findAll({
      skip: skip ? parseInt(skip) : undefined,
      take: take ? parseInt(take) : undefined,
    });
    return users.map(({ password, refreshToken, ...u }) => u);
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const { password, refreshToken, ...user } = await this.usersService.findOne(id);
    return user;
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() dto: UpdateUserDto) {
    const { password, refreshToken, ...user } = await this.usersService.update(id, dto);
    return user;
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    const { password, refreshToken, ...user } = await this.usersService.remove(id);
    return user;
  }
}
