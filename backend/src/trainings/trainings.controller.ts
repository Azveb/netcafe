import { Controller, Get, Post, Patch, Delete, Param, Body, UseGuards, Req } from '@nestjs/common';
import { TrainingsService } from './trainings.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@Controller('trainings')
export class TrainingsController {
  constructor(private readonly trainingsService: TrainingsService) {}
  @Post() @UseGuards(JwtAuthGuard) create(@Body() dto: any) { return this.trainingsService.create(dto); }
  @Get() findAll() { return this.trainingsService.findAll(); }
  @Get(':id') findOne(@Param('id') id: string) { return this.trainingsService.findOne(id); }
  @Patch(':id') @UseGuards(JwtAuthGuard) update(@Param('id') id: string, @Body() dto: any) { return this.trainingsService.update(id, dto); }
  @Delete(':id') @UseGuards(JwtAuthGuard) remove(@Param('id') id: string) { return this.trainingsService.remove(id); }
  @Post(':id/register') @UseGuards(JwtAuthGuard) register(@Param('id') id: string, @Req() req: any) { return this.trainingsService.register(id, req.user.userId); }
}
