import { Injectable, OnModuleInit, OnModuleDestroy } from '@nestjs/common';
import Redis from 'ioredis';
@Injectable()
export class RedisService implements OnModuleInit, OnModuleDestroy {
  private client: Redis;
  onModuleInit() {
    this.client = new Redis({ host: process.env.REDIS_HOST || 'localhost', port: parseInt(process.env.REDIS_PORT || '6379') });
  }
  onModuleDestroy() { this.client?.disconnect(); }
  async get(key: string) { return this.client.get(key); }
  async set(key: string, value: string, ttl?: number) { return ttl ? this.client.set(key, value, 'EX', ttl) : this.client.set(key, value); }
  async setex(key: string, ttl: number, value: string) { return this.client.setex(key, ttl, value); }
  async del(key: string) { return this.client.del(key); }
}
