'use server';

import { ComAtprotoAdminDefs } from '@atproto/api';
import { basicAuth, readEnv } from './config';
import { FetchError, createFetch } from '../fetch';
import { ActionResponse } from './action';

export async function getAccountInfo(
  did: string
): ActionResponse<ComAtprotoAdminDefs.AccountView> {
  const { PDS_HOSTNAME } = await readEnv();

  try {
    const url = new URL(
      `/xrpc/com.atproto.admin.getAccountInfo`,
      `https://${PDS_HOSTNAME}`
    );
    url.searchParams.append('did', did);
    const auth = await basicAuth();
    const response = await createFetch<ComAtprotoAdminDefs.AccountView>(url, {
      method: 'GET',
      headers: {
        Authorization: auth,
        'Content-Type': 'application/json'
      },
      cache: 'no-store'
    });
    return [response];
  } catch (err) {
    return [undefined, (err as FetchError).message];
  }
}

export async function searchAccounts({
  email,
  cursor,
  limit
}: {
  email?: string;
  cursor?: string;
  limit?: number;
}): ActionResponse<{
  cursor?: string;
  accounts: ComAtprotoAdminDefs.AccountView[];
}> {
  const { PDS_HOSTNAME } = await readEnv();

  try {
    const url = new URL(
      `/xrpc/com.atproto.admin.searchAccounts`,
      `https://${PDS_HOSTNAME}`
    );
    url.searchParams.append('email', email ?? '');
    url.searchParams.append('cursor', cursor ?? '');
    if (limit !== undefined) {
      url.searchParams.append('limit', String(limit));
    }
    const auth = await basicAuth();
    const response = await createFetch<{
      cursor?: string;
      accounts: ComAtprotoAdminDefs.AccountView[];
    }>(url, {
      method: 'GET',
      headers: {
        Authorization: auth,
        'Content-Type': 'application/json'
      },
      cache: 'no-store'
    });
    return [{ cursor: response.cursor, accounts: response.accounts }];
  } catch (err) {
    return [undefined, (err as FetchError).message];
  }
}

export async function updateAccountPassword(
  did: string,
  password: string
): ActionResponse<boolean> {
  const { PDS_HOSTNAME } = await readEnv();

  try {
    const url = new URL(
      `/xrpc/com.atproto.admin.updateAccountPassword`,
      `https://${PDS_HOSTNAME}`
    );
    const auth = await basicAuth();
    await createFetch(url, {
      method: 'POST',
      headers: {
        Authorization: auth,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ did, password }),
      cache: 'no-store'
    });
    return [true];
  } catch (err) {
    return [undefined, (err as FetchError).message];
  }
}
