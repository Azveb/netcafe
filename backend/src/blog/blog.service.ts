import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
@Injectable()
export class BlogService {
  constructor(private prisma: PrismaService) {}
  async create(dto: any) { return this.prisma.blogPost.create({ data: dto }); }
  async findAll(where?: any) { return this.prisma.blogPost.findMany({ where, orderBy: { createdAt: 'desc' } }); }
  async findOne(id: string) {
    const p = await this.prisma.blogPost.findUnique({ where: { id } });
    if (!p) throw new NotFoundException(`Post ${id} not found`);
    return p;
  }
  async findBySlug(slug: string) {
    const p = await this.prisma.blogPost.findFirst({ where: { slug } });
    if (!p) throw new NotFoundException(`Post slug:${slug} not found`);
    return p;
  }
  async update(id: string, dto: any) { await this.findOne(id); return this.prisma.blogPost.update({ where: { id }, data: dto }); }
  async remove(id: string) { await this.findOne(id); return this.prisma.blogPost.delete({ where: { id } }); }
}
