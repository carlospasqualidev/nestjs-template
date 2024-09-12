import 'dotenv/config';
import { registerErrorLog } from 'src/utilities/error';

type envVars =
  | 'PORT'
  | 'PROJECT_NAME'
  | 'PROJECT_VERSION'
  | 'PROJECT_DESCRIPTION'
  | 'ENVIRONMENT'
  | 'DATABASE_URL'
  | 'CORS_ORIGIN'
  | 'LOG_SERVER_URL'
  | 'JWT_SECRET'
  | 'CRYPTO_SECRET'
  | 'TZ'
  | 'NODEMAILER_EMAIL'
  | 'NODEMAILER_PASSWORD';

class EnvCore {
  public get(key: envVars): any {
    const value = process.env[key];

    if (!value) {
      const error = `Environment variable ${key} not found.`;
      registerErrorLog(error);
      throw new Error(error);
    }
    return process.env[key];
  }
}

export const env = new EnvCore();
