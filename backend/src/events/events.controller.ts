import { Controller, Get, Post, Patch, Delete, Param, Body } from '@nestjs/common';
import { EventsService } from './events.service';
@Controller('events')
export class EventsController {
  constructor(private readonly svc: EventsService) {}
  @Post() create(@Body() dto: any) { return this.svc.create(dto); }
  @Get() findAll() { return this.svc.findAll(); }
  @Get(':id') findOne(@Param('id') id: string) { return this.svc.findOne(id); }
  @Patch(':id') update(@Param('id') id: string, @Body() dto: any) { return this.svc.update(id, dto); }
  @Delete(':id') remove(@Param('id') id: string) { return this.svc.remove(id); }
}
