'use server';

import { ComAtprotoIdentityResolveHandle } from '@atproto/api';
import { readEnv } from './config';
import { FetchError, createFetch } from '../fetch';
import { ActionResponse } from './action';

export async function resolveHandle(
  handle: string
): ActionResponse<ComAtprotoIdentityResolveHandle.OutputSchema> {
  const { PDS_HOSTNAME } = await readEnv();

  try {
    const url = new URL(
      `/xrpc/com.atproto.identity.resolveHandle`,
      `https://${PDS_HOSTNAME}`
    );
    url.searchParams.append('handle', handle);
    const response =
      await createFetch<ComAtprotoIdentityResolveHandle.OutputSchema>(url, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        },
        cache: 'no-store'
      });
    return [response];
  } catch (err) {
    return [undefined, (err as FetchError).message];
  }
}
