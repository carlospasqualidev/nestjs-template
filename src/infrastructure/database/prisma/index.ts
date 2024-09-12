import { Injectable, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class Prisma extends PrismaClient implements OnModuleInit {
  async onModuleInit() {
    await this.$connect();
  }
}

export { Prisma as IPrisma } from '@prisma/client';
export { $Enums as enums } from '@prisma/client';
export const prisma = new Prisma();
