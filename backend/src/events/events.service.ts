import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
@Injectable()
export class EventsService {
  constructor(private prisma: PrismaService) {}
  async create(dto: any) { return this.prisma.event.create({ data: { ...dto, startDate: new Date(dto.startDate), endDate: new Date(dto.endDate) } }); }
  async findAll() { return this.prisma.event.findMany({ orderBy: { startDate: 'asc' } }); }
  async findOne(id: string) {
    const e = await this.prisma.event.findUnique({ where: { id } });
    if (!e) throw new NotFoundException(`Event ${id} not found`);
    return e;
  }
  async update(id: string, dto: any) { await this.findOne(id); const data: any = {...dto}; if(dto.startDate) data.startDate = new Date(dto.startDate); if(dto.endDate) data.endDate = new Date(dto.endDate); return this.prisma.event.update({ where: { id }, data }); }
  async remove(id: string) { await this.findOne(id); return this.prisma.event.delete({ where: { id } }); }
}
