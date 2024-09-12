import { InternalServerErrorException } from '@nestjs/common';
import { transporter } from '../config/mailer/configMailer';
import { confirmationTemplateForRegistration } from './templates';
import { registerErrorLog } from '../../utilities/error';

interface ISendConfirmationForRegistration {
  toEmail: string;
  token: string;
}

export class Mailer {
  async sendConfirmationForRegistration(
    params: ISendConfirmationForRegistration,
  ) {
    const mail = {
      from: `Confirmação de E-mail <${process.env.NODEMAILER_EMAIL}>`,
      to: params.toEmail,
      subject: `e-duzca - Confirmação de E-mail`,
      html: confirmationTemplateForRegistration(params.token),
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
