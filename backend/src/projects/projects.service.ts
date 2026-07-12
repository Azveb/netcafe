import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
@Injectable()
export class ProjectsService {
  constructor(private readonly prisma: PrismaService) {}
  async create(dto: any) {
    const ex = await this.prisma.project.findUnique({ where: { slug: dto.slug } });
    if (ex) throw new ConflictException('Slug exists');
    return this.prisma.project.create({ data: dto });
  }
  async findAll() { return this.prisma.project.findMany({ include: { applications: true } }); }
  async findOne(id: string) {
    const p = await this.prisma.project.findUnique({ where: { id }, include: { applications: true } });
    if (!p) throw new NotFoundException(`Project ${id} not found`);
    return p;
  }
  async update(id: string, dto: any) { await this.findOne(id); return this.prisma.project.update({ where: { id }, data: dto }); }
  async remove(id: string) { await this.findOne(id); return this.prisma.project.delete({ where: { id } }); }
}
