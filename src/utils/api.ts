export const getApiMessage = (e: unknown, fallback: string): string => {
  if (typeof e === 'object' && e !== null) {
    const obj = e as { data?: { message?: string }; message?: string };
    return obj.data?.message ?? obj.message ?? fallback;
  }
  return fallback;
};

