import { Controller, Get, Post, Patch, Delete, Param, Body } from '@nestjs/common';
import { BlogService } from './blog.service';
@Controller('blog')
export class BlogController {
  constructor(private readonly svc: BlogService) {}
  @Post() create(@Body() dto: any) { return this.svc.create(dto); }
  @Get() findAll() { return this.svc.findAll(); }
  @Get('slug/:slug') findBySlug(@Param('slug') slug: string) { return this.svc.findBySlug(slug); }
  @Get(':id') findOne(@Param('id') id: string) { return this.svc.findOne(id); }
  @Patch(':id') update(@Param('id') id: string, @Body() dto: any) { return this.svc.update(id, dto); }
  @Delete(':id') remove(@Param('id') id: string) { return this.svc.remove(id); }
}
