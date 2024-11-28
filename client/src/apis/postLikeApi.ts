import axios from 'axios';
import { IProfile } from '../components/profile/ProfileListModal';

const API_URL = '/api/post-like';

export const likePost = async (postId: number) => {
    const token = localStorage.getItem('authToken');
    return axios.post(`${API_URL}/${postId}/like`, {}, {
        headers: { Authorization: `Bearer ${token}` }
    });
};

export const unlikePost = async (postId: number) => {
    const token = localStorage.getItem('authToken');
    return axios.post(`${API_URL}/${postId}/unlike`, {}, {
        headers: { Authorization: `Bearer ${token}` }
    });
};

export const hasUserLikedPost = async (postId: number) => {
    const token = localStorage.getItem('authToken');
    return axios.get(`${API_URL}/${postId}/hasLiked`, {
        headers: { Authorization: `Bearer ${token}` }
    });
};

export const getLikers = async (postId: number) => {
    const token = localStorage.getItem('authToken');
    return axios.get<IProfile[]>(`${API_URL}/${postId}/likers`, {
        headers: { Authorization: `Bearer ${token}` }
    });
};