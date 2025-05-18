import type { User } from '../types/User';
import { PUBLIC_API_URL } from '$env/static/public';

export async function getUser() : Promise<User | null> {
	try {
		const res = await fetch(`${PUBLIC_API_URL}/api/user/@me`, {
			method: 'GET',
			credentials: 'include',
		});

		if (!res.ok) {
			return null;
		}

		const data: User = await res.json();
		console.log(data);
		return data;
	} catch (error) {
		console.log(error);
		return null;
	}
}