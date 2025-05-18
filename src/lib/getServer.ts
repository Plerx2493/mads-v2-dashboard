import type { Server } from '../types/server';
import { PUBLIC_API_URL } from '$env/static/public';

export async function getServer(id: number): Promise<Server | null> {
  try {
    const res = await fetch(`${PUBLIC_API_URL}/api/user/@me/guilds/${id}`, {
      method: 'GET',
      credentials: 'include'
    });

    if (!res.ok) {
      return null;
    }

    return await res.json();
  } catch (error) {
    console.error('Error fetching servers:', error);
    return null;
  }
}
