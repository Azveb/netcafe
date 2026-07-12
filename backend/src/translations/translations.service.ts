import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { RedisService } from '../../redis/redis.service';

@Injectable()
export class TranslationsService {
  constructor(
    private prisma: PrismaService,
    private redis: RedisService,
  ) {}

  async getTranslation(key: string, locale: string) {
    const cacheKey = `translation:${key}:${locale}`;
    const cached = await this.redis.get(cacheKey);
    if (cached) return JSON.parse(cached);

    const translation = await this.prisma.translation.findUnique({
      where: { key_locale: { key, locale } },
    });

    if (!translation) return null;

    await this.redis.setex(cacheKey, 3600, JSON.stringify(translation.value));
    return translation.value;
  }

  async getTranslations(locale: string) {
    const cacheKey = `translations:${locale}`;
    const cached = await this.redis.get(cacheKey);
    if (cached) return JSON.parse(cached);

    const translations = await this.prisma.translation.findMany({
      where: { locale },
    });

    const result = translations.reduce((acc, t) => {
      if (!acc[t.namespace]) acc[t.namespace] = {};
      acc[t.namespace][t.key] = t.value;
      return acc;
    }, {} as Record<string, any>);

    await this.redis.setex(cacheKey, 3600, JSON.stringify(result));
    return result;
  }

  async upsertTranslation(data: { key: string; locale: string; value: string; namespace: string }) {
    const translation = await this.prisma.translation.upsert({
      where: { key_locale: { key: data.key, locale: data.locale } },
      update: { value: data.value, namespace: data.namespace },
      create: data,
    });

    await this.redis.del(`translation:${data.key}:${data.locale}`);
    await this.redis.del(`translations:${data.locale}`);

    return translation;
  }
}