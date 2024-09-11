import axios from 'axios';
import React, { useState, useEffect } from 'react';

import './Profile.css';

interface UserProfileProps {
    userId: string;
}

interface UserData {
    id: number;
    displayName: string;
    description: string;
    birthday: Date;
    createdAt: Date;
    //TODO: make actual interface
    user: any;
}

const Profile: React.FC<UserProfileProps> = ({userId}) => {
  const [userData, setUserData] = useState<UserData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchUserData = async () => {
      setLoading(true);
      try {
        const res = await axios.get<UserData>(`/api/userProfile/${userId}`);
        setUserData(res.data);
      } catch (error) {
        console.error("Error fetching user data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [userId]);

  if (loading) {
    return <div className="text-center p-4">Loading...</div>;
  }

  if (!userData) {
    return <div className="text-center p-4">User not found</div>;
  }

  return (
    <div className="profile">
      <div className="banner">banner</div>
      <h3 className="displayName">{userData.displayName}</h3>
      <p className="userName">@{userData.user.username}</p>
      <p className="description">{userData.description}</p>
    </div>
  );
};

export default Profile;