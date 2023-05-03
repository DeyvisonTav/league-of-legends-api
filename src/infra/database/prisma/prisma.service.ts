import { INestApplication, Injectable, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit {
  static user: any;
  constructor() {
    super({
      log: ['query'],
    });
    console.log(this.user);
  }

  async onModuleInit() {
    await this.$connect();
    console.log('Prisma connected!');
  }

  async enableShutdownHooks(app: INestApplication) {
    this.$on('beforeExit', async () => {
      await app.close();
    });
  }
}
