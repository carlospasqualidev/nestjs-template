// IMPORTS
import { Injectable } from '@nestjs/common';
import { jwt } from 'src/infrastructure/security/jwt';
import { mailer } from 'src/infrastructure/email/mailer';
//#endregion

//#region DTOS
import { AccessSendEmailForUpdatePasswordDTO } from 'src/application/dtos/access';
//#endregion

@Injectable()
export class AccessSendEmailForUpdatePasswordUseCase {
  public async execute(dto: AccessSendEmailForUpdatePasswordDTO) {
    const token = jwt.sign({ email: dto.email }, '15m');

    await mailer.sendUpdatePasswordRequest({
      toEmail: dto.email,
      token,
      redirectUrl: dto.redirectUrl,
    });
  }
}
