import { env } from '../../infrastructure/config/env';

export async function registerErrorLog(errorStack: any, extraInfo?: any) {
  if (!['sandbox', 'production'].includes(env.get('ENVIRONMENT').toLowerCase()))
    return;

  await fetch(env.get('LOG_SERVER_URL'), {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      projectName: process.env.PROJECT_NAME,
      environment: process.env.ENVIRONMENT,
      side: 'Server',
      errorStack,
      extraInfo,
    }),
  });
}
