import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
@Injectable()
export class PaymentsService {
  constructor(private prisma: PrismaService) {}
  async create(dto: any) { return this.prisma.payment.create({ data: dto }); }
  async findByUser(userId: string) { return this.prisma.payment.findMany({ where: { userId } }); }
}
