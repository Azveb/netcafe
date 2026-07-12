import { Controller, Get, Post, Body, Param, UseGuards } from '@nestjs/common';
import { PaymentsService } from './payments.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
@Controller('payments')
@UseGuards(JwtAuthGuard)
export class PaymentsController {
  constructor(private readonly svc: PaymentsService) {}
  @Post() create(@Body() dto: any) { return this.svc.create(dto); }
  @Get('user/:userId') findByUser(@Param('userId') userId: string) { return this.svc.findByUser(userId); }
}
