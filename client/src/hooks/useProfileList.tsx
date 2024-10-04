import { useState, useCallback } from 'react';
import axios from 'axios';

interface Profile {
  id: number;
  username: string;
  displayName: string;
}

const useProfileList = () => {
  const [users, setUsers] = useState<Profile[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchUsers = useCallback(async (url: string) => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await axios.get<Profile[]>(url);
      setUsers(response.data);
    } catch (err) {
      setError('Failed to fetch users');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  }, []);

  return { users, isLoading, error, fetchUsers };
};

export default useProfileList;