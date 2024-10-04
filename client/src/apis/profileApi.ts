import axios from "axios";

const API_URL = '/api/userProfile';

export interface IUserProfile {
    id: number;
    displayName: string;
    description: string;
    birthday: Date;
    createdAt: Date;
    //TODO: make actual interface
    user: any;
}

export const getUserProfile = async (username: string) => {
    return await axios.get<IUserProfile>(`${API_URL}/${username}`);
}


export const updateUserProfile = async (userProfile: any) => {
    return await axios.put<any>(`/api/userProfile/update`,
      {
        displayName: userProfile.editedDisplayName,
        description: userProfile.editedDescription
      },
      {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('authToken')}`,
          'Content-Type': 'application/json'
        } 
      }
    );
}