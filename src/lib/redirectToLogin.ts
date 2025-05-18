import { PUBLIC_API_URL } from '$env/static/public';

export function redirectToLogin() {
  window.location.href = `${PUBLIC_API_URL}/api/user/login?ReturnUrl=` + window.location.href;
}
