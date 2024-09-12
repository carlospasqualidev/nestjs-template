import { configApi } from './configApi';
import { configSwagger } from './configSwagger';
import { configSecurity } from './configSecurity';
import { env } from '../env';

export async function serverSetup() {
  const app = await configApi();
  await configSwagger(app);
  await configSecurity(app);
  await app.listen(env.get('PORT'));
}
