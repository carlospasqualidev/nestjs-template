import { InternalServerErrorException } from '@nestjs/common';
import { transporter } from '../config/mailer/configMailer';
import {
  IAccessUpdatePasswordTemplate,
  IRegisterConfirmationTemplate,
  accessUpdatePasswordTemplate,
  registerConfirmationTemplate,
} from './templates';
import { registerErrorLog } from '../../utilities/error';

export class Mailer {
  async sendConfirmationForRegistration(params: IRegisterConfirmationTemplate) {
    const mail = {
      from: `Confirmação de E-mail <${process.env.NODEMAILER_EMAIL}>`,
      to: params.toEmail,
      subject: `Confirmação de E-mail`,
      html: registerConfirmationTemplate(params),
    };

    await transporter.sendMail(mail).catch((error: Error) => {
      registerErrorLog(error);
      throw new InternalServerErrorException(
        'Oops! Encontramos um problema ao enviar o email.',
      );
    });
  }

  async sendUpdatePasswordRequest(params: IAccessUpdatePasswordTemplate) {
    const mail = {
      from: `Confirmação de E-mail <${process.env.NODEMAILER_EMAIL}>`,
      to: params.toEmail,
      subject: `Confirmação de E-mail`,
      html: accessUpdatePasswordTemplate(params),
    };

    await transporter.sendMail(mail).catch((error: Error) => {
      registerErrorLog(error);
      throw new InternalServerErrorException(
        'Oops! Encontramos um problema ao enviar o email.',
      );
    });
  }
}

export const mailer = new Mailer();
