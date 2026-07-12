import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class TrainingsService {
  constructor(private readonly prisma: PrismaService) {}

  async create(dto: any) {
    const existing = await this.prisma.training.findUnique({ where: { slug: dto.slug } });
    if (existing) throw new ConflictException('Slug already exists');
    return this.prisma.training.create({
      data: { ...dto, startDate: new Date(dto.startDate), endDate: new Date(dto.endDate) },
    });
  }

  async findAll() {
    return this.prisma.training.findMany({ include: { registrations: true } });
  }

  async findOne(id: string) {
    const t = await this.prisma.training.findUnique({ where: { id }, include: { registrations: true } });
    if (!t) throw new NotFoundException(`Training ${id} not found`);
    return t;
  }

  async update(id: string, dto: any) {
    await this.findOne(id);
    const data: any = { ...dto };
    if (dto.startDate) data.startDate = new Date(dto.startDate);
    if (dto.endDate) data.endDate = new Date(dto.endDate);
    return this.prisma.training.update({ where: { id }, data });
  }

  async remove(id: string) {
    await this.findOne(id);
    return this.prisma.training.delete({ where: { id } });
  }

  async register(trainingId: string, userId: string) {
    const training = await this.findOne(trainingId);
    const existing = await this.prisma.trainingRegistration.findUnique({
      where: { userId_trainingId: { userId, trainingId } },
    });
    if (existing) throw new ConflictException('Already registered');
    if (training.availableSeats <= 0) throw new ConflictException('No available seats');
    return this.prisma.$transaction(async (tx) => {
      await tx.training.update({ where: { id: trainingId }, data: { availableSeats: { decrement: 1 } } });
      return tx.trainingRegistration.create({ data: { userId, trainingId, status: 'PENDING' as any } });
    });
  }
}
