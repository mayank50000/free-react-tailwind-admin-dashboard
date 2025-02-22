// src/hooks/useApi.ts
import { useState, useCallback } from 'react';

type ApiFunction<T> = (...args: any[]) => Promise<T>;

export function useApi<T>(getPublicNews: any) {
  const [data, setData] = useState<T | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const execute = useCallback(async (apiFunction: ApiFunction<T>, ...args: any[]) => {
    try {
      setLoading(true);
      const result = await apiFunction(...args);
      setData(result);
      setError(null);
      return result;
    } catch (err) {
      const message = err instanceof Error ? err.message : 'An unknown error occurred';
      setError(message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  return { data, error, loading, execute };
}