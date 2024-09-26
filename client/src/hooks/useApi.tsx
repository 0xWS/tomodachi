import { useState, useCallback } from 'react';
import { AxiosRequestConfig, AxiosResponse, AxiosError } from 'axios';
import apiClient from '../utils/apiClient';

interface UseApiResult<T> {
  data: T | null;
  loading: boolean;
  error: string | null;
  fetchData: (config: AxiosRequestConfig) => Promise<void>;
}

function useApi<T>(): UseApiResult<T> {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const fetchData = useCallback(async (config: AxiosRequestConfig) => {
    setLoading(true);
    setError(null);
    try {
      const response: AxiosResponse<T> = await apiClient(config);
      setData(response.data);
    } catch (err) {
      const axiosError = err as AxiosError;
      setError(axiosError.message || 'An error occurred');
    } finally {
      setLoading(false);
    }
  }, []);

  return { data, loading, error, fetchData };
}

export default useApi;
