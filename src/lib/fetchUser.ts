import type { User } from '../types/user';
import { PUBLIC_API_URL } from '$env/static/public';
import { userStore } from '$lib/index';

export async function fetchUser(): Promise<boolean> {
  try {
    const res = await fetch(`${PUBLIC_API_URL}/api/user/@me`, {
      method: 'GET',
      credentials: 'include'
    });

    if (!res.ok) {
      return false;
    }

    const data: User = await res.json();

    userStore.set(data);

    return true;
  } catch (error) {
    console.log(error);
    return true;
  }
}
