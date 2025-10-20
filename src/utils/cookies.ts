export const getCookie = (name: string): string | null => {
  if (typeof document === 'undefined') return null;
  const match = document.cookie.match(new RegExp('(^| )' + name + '=([^;]+)'));
  return match ? decodeURIComponent(match[2]) : null;
};

export const getCsrfToken = (): string | null => {
  // Adjust the cookie name to your backend convention if needed
  return getCookie('XSRF-TOKEN');
};

