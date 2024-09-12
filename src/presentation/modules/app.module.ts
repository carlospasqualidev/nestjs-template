import { Module } from '@nestjs/common';
import { RouterModule } from '@nestjs/core';
import { AccessModule } from './access.module';

@Module({
  imports: [
    AccessModule,
    RouterModule.register([
      {
        path: 'auth',
        module: AccessModule,
      },
    ]),
  ],
})
export class AppModule {}
