import { Controller, Get, Post, Body, Param, Query } from '@nestjs/common';
import { TranslationsService } from './translations.service';

@Controller('translations')
export class TranslationsController {
  constructor(private readonly translationsService: TranslationsService) {}

  @Get(':locale')
  getTranslations(@Param('locale') locale: string) {
    return this.translationsService.getTranslations(locale);
  }

  @Get(':locale/:key')
  getTranslation(@Param('locale') locale: string, @Param('key') key: string) {
    return this.translationsService.getTranslation(key, locale);
  }

  @Post()
  upsertTranslation(@Body() data: { key: string; locale: string; value: string; namespace: string }) {
    return this.translationsService.upsertTranslation(data);
  }
}
