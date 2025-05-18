// place files you want to import through the `$lib` alias in this folder.
import { writable, type Writable } from 'svelte/store';
import type { User } from '../types/User';

/** Store for your data.
This assumes the data you're pulling back will be an array.
If it's going to be an object, default this to an empty object.
 **/
export const userStore: Writable<User | null> = writable();