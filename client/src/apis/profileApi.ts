import axios from "axios";

const API_URL = '/api/userProfile';

export interface IUserProfile {
    id: number;
    displayName: string;
    description: string;
    birthday: Date;
    createdAt: Date;
    profilePicture: string; //Most likely
    //TODO: make actual interface
    user: any;
}

export const getUserProfile = async (username: string) => {
    return await axios.get<IUserProfile>(`${API_URL}/${username}`);
}

export const getUserPfp = async (username: string) => {
  return await axios.get<any>(`${API_URL}/???`)
}

export const updateUserProfile = async (formData: FormData) => {
    return await axios.put<any>(`/api/userProfile/update`,
      formData,
      {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('authToken')}`,
          'Content-Type': 'multipart/form-data'
        } 
      }
    );
}