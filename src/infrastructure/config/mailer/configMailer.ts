import { createTransport } from 'nodemailer';
import { env } from '../env';

export const transporter = createTransport({
  host: 'smtp.mail.us-west-2.awsapps.com',
  port: 465,
  secure: true,
  auth: {
    user: env.get('NODEMAILER_EMAIL'),
    pass: env.get('NODEMAILER_PASSWORD'),
  },
  tls: { rejectUnauthorized: false },
});
