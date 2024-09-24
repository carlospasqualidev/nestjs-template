// IMPORTS
import { Injectable } from '@nestjs/common';
import { jwt } from 'src/infrastructure/security/jwt';
import { mailer } from 'src/infrastructure/email/mailer';
//#endregion

//#region DTOS
import { RegisterSendEmailForRegistrationUserDTO } from 'src/application/dtos/register';
//#endregion

@Injectable()
export class RegisterSendEmailForRegistrationUseCase {
  public async execute(dto: RegisterSendEmailForRegistrationUserDTO) {
    const token = jwt.sign({ email: dto.email }, '15m');

    await mailer.sendConfirmationForRegistration({
      toEmail: dto.email,
      token,
      redirectUrl: dto.redirectUrl,
    });
  }
}
