//#region IMPORTS
import { Module } from '@nestjs/common';
import { RouterModule } from '@nestjs/core';
//#endregion

//#region MODULES
import { AccessModule } from './access.module';
import { RegisterModule } from './register.module';
import { GlobalModule } from './global.module';
//#endregion

@Module({
  imports: [
    GlobalModule,
    AccessModule,
    RouterModule.register([
      {
        path: 'access',
        module: AccessModule,
      },
    ]),

    RegisterModule,
    RouterModule.register([
      {
        path: 'register',
        module: RegisterModule,
      },
    ]),
  ],
})
export class AppModule {}
