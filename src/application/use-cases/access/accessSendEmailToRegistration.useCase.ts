import { Injectable } from '@nestjs/common';
import { AccessSendEmailForRegistrationDTO } from 'src/application/dtos/access';

import { mailer } from 'src/infrastructure/email/mailer';
import { jwt } from 'src/infrastructure/security/jwt';

@Injectable()
export class AccessSendEmailForRegistrationUseCase {
  public async execute(dto: AccessSendEmailForRegistrationDTO) {
    const token = jwt.sign({ email: dto.email }, '15m');

    await mailer.sendConfirmationForRegistration({
      toEmail: dto.email,
      token,
    });
  }
}
