import type { Server } from '../types/server';
import { PUBLIC_API_URL } from '$env/static/public';
import { serverStore } from '$lib';

export async function fetchServers(): Promise<void> {
  try {
    const res = await fetch(`${PUBLIC_API_URL}/api/user/@me/guilds`, {
      method: 'GET',
      credentials: 'include'
    });

    if (!res.ok) {
      console.error('Error fetching servers:', res);
      return;
    }

    const data : Server[] = await res.json();

    serverStore.set(data);

    return;

  } catch (error) {
    console.error('Error fetching servers:', error);
    return;
  }
}
