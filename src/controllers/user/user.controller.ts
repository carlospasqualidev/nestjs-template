import { Body, Controller, Inject, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { UserCreateDTO } from 'src/dtos/user';

import { UserEntity } from 'src/entities/user.entity';
import { UserCreateUseCase } from 'src/use-cases/user';
import { dateTime } from 'src/utilities/date-time/date-time';

@ApiTags('Users')
@Controller()
export class UserController {
  @Inject(UserCreateUseCase)
  private readonly createProjectUseCase: UserCreateUseCase;

  @Post('/create')
  async Create(@Body() data: UserCreateDTO): Promise<UserEntity> {
    console.log(dateTime.add(new Date()).days(1));
    console.log(dateTime.add(new Date()).months(1));
    console.log(dateTime.add(new Date()).years(1));
    console.log(dateTime.add(new Date()).minutes(10));
    console.log(dateTime.add(new Date()).hours(1));
    console.log('\n');
    console.log(dateTime.remove(new Date()).days(1));
    console.log(dateTime.remove(new Date()).months(1));
    console.log(dateTime.remove(new Date()).years(1));
    console.log(dateTime.remove(new Date()).minutes(10));
    console.log(dateTime.remove(new Date()).hours(1));
    console.log('\n');
    console.log(dateTime.format(new Date()).date());
    console.log(dateTime.format(new Date()).dateAndTime());
    console.log(dateTime.format(new Date()).time());
    console.log('\n');
    console.log(dateTime.set(new Date()).utcMidnight());
    console.log(dateTime.set(new Date()).utcEndOfDay());

    return this.createProjectUseCase.execute(data);
  }

  @Post('/update')
  async Update(@Body() data: UserCreateDTO): Promise<UserEntity> {
    return this.createProjectUseCase.execute(data);
  }
}
