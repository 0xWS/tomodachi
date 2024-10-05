import axios from "axios";

const API_URL = '/api/follows'
const TOKEN = localStorage.getItem('authToken') || '';

export const getIsFollowed = async (userId: number) => {
    return axios.get<boolean>(`${API_URL}/isFollowed/${userId}`,
        {
            headers: {
                'Authorization': `Bearer ${TOKEN}`,
                'Content-Type': 'application/json'
            }
        }
    );
}

export const followUser = async (userId: number) => {
    return await axios.post<any>(`${API_URL}/follow/${userId}`,
      {},
      {
        headers: {
          'Authorization': `Bearer ${TOKEN}`,
          'Content-Type': 'application/json'
        } 
      }
    );
}

export const unfollowUser = async (userId: number) => {
    return await axios.delete<any>(`${API_URL}/follow/${userId}`,
      {
        headers: {
          'Authorization': `Bearer ${TOKEN}`,
          'Content-Type': 'application/json'
        } 
      }
    );
}

export const getFollowers = async (userId: number | null) => {
    if (!userId) throw new Error('User ID is required');
    return await axios.get<any[]>(`${API_URL}/followers/${userId}`);
}

export const getFollows = async (userId: number | null) => {
    if (!userId) throw new Error('User ID is required');
    return await axios.get<any[]>(`${API_URL}/follows/${userId}`);
} 