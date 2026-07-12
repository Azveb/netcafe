import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PrismaModule } from './prisma/prisma.module';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { TrainingsModule } from './trainings/trainings.module';
import { ProjectsModule } from './projects/projects.module';
import { ApplicationsModule } from './applications/applications.module';
import { PaymentsModule } from './payments/payments.module';
import { BlogModule } from './blog/blog.module';
import { EventsModule } from './events/events.module';
import { RedisModule } from './redis/redis.module';
import { TranslationsModule } from './translations/translations.module';
import { ThrottlerModule } from '@nestjs/throttler';
import { ScheduleModule } from '@nestjs/schedule';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, envFilePath: '.env' }),
    ThrottlerModule.forRoot([{ ttl: 60000, limit: 100 }]),
    ScheduleModule.forRoot(),
    PrismaModule,
    RedisModule,
    AuthModule,
    UsersModule,
    TrainingsModule,
    ProjectsModule,
    ApplicationsModule,
    PaymentsModule,
    BlogModule,
    EventsModule,
    TranslationsModule,
  ],
})
export class AppModule {}
