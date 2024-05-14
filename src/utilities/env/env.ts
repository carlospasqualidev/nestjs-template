type envVars =
  | 'PORT'
  | 'PROJECT_NAME'
  | 'PROJECT_VERSION'
  | 'PROJECT_DESCRIPTION'
  | 'ENVIRONMENT'
  | 'DATABASE_URL'
  | 'CORS_ORIGIN'
  | 'LOG_SERVER_URL'
  | 'JWT_SECRET';

class EnvCore {
  public get(key: envVars): any {
    const value = process.env[key];

    if (!value) throw new Error(`Environment variable ${key} not found`);
    return process.env[key];
  }
}

export const env = new EnvCore();
