import { Controller, Get, Post, Patch, Delete, Param, Body, Query } from '@nestjs/common';
import { ApplicationsService } from './applications.service';
@Controller('applications')
export class ApplicationsController {
  constructor(private readonly svc: ApplicationsService) {}
  @Post() create(@Body() dto: any) { return this.svc.create(dto); }
  @Get() findAll(@Query('userId') userId?: string) { return this.svc.findAll(userId ? { userId } : undefined); }
  @Get(':id') findOne(@Param('id') id: string) { return this.svc.findOne(id); }
  @Patch(':id') update(@Param('id') id: string, @Body() dto: any) { return this.svc.update(id, dto); }
  @Delete(':id') remove(@Param('id') id: string) { return this.svc.remove(id); }
}
