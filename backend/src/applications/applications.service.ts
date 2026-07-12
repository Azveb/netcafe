import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
@Injectable()
export class ApplicationsService {
  constructor(private prisma: PrismaService) {}
  async create(dto: any) { return this.prisma.application.create({ data: dto }); }
  async findAll(where?: any) { return this.prisma.application.findMany({ where, orderBy: { createdAt: 'desc' } }); }
  async findOne(id: string) {
    const a = await this.prisma.application.findUnique({ where: { id } });
    if (!a) throw new NotFoundException(`Application ${id} not found`);
    return a;
  }
  async update(id: string, dto: any) { await this.findOne(id); return this.prisma.application.update({ where: { id }, data: dto }); }
  async remove(id: string) { await this.findOne(id); return this.prisma.application.delete({ where: { id } }); }
}
