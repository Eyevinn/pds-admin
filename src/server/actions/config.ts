'use server';

export interface Config {
  PDS_HOSTNAME: string;
  PDS_ADMIN_USER: string;
  PDS_ADMIN_PASSWORD: string;
}

export async function readEnv(): Promise<Config> {
  if (!process.env.PDS_URL) {
    throw new Error('PDS_URL is not set');
  }
  const pdsUrl = new URL(process.env.PDS_URL);
  return {
    PDS_HOSTNAME: pdsUrl.hostname,
    PDS_ADMIN_USER: pdsUrl.username,
    PDS_ADMIN_PASSWORD: pdsUrl.password
  };
}

export async function basicAuth() {
  const config = await readEnv();
  return `Basic ${Buffer.from(
    `${config.PDS_ADMIN_USER}:${config.PDS_ADMIN_PASSWORD}`
  ).toString('base64')}`;
}
