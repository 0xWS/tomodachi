import axios from 'axios';
import React, { useState, useEffect } from 'react';


interface UserProfileProps {
    username: string;
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

const Profile: React.FC<UserProfileProps> = ({username}) => {
  const [userData, setUserData] = useState<UserData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchUserData = async () => {
      setLoading(true);
      try {
        if(username !== "NAME_MISSING") {
          const res = await axios.get<UserData>(`/api/userProfile/${username}`);
          setUserData(res.data);
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [username]);

  if (loading) {
    return <div className="text-center p-4">Loading...</div>;
  }

  if (!userData) {
    return <div className="text-center p-4">User not found</div>;
  }

  return (
    <div className="relative flex max-w-[24rem] flex-col rounded-lg bg-white bg-clip-border text-gray-700 shadow-md">
      <div className="relative m-0 overflow-hidden rounded-t-lg bg-transparent bg-clip-border text-gray-700 shadow-none">
        <img src='http://localhost:3000/forest.jpg'/>
      </div>
      <div className="p-6">
        <h4 className="block font-sans text-2xl font-semibold leading-snug tracking-normal text-blue-gray-900 antialiased">
          {userData.displayName}
        </h4>
        <p className="block font-sans text-base font-normal leading-relaxed text-inherit antialiased">
          @{userData.user.username}
        </p>
        <p className="block font-sans text-xl font-normal leading-relaxed text-gray-700 antialiased">
          {userData.description}
        </p>
        <p className="mt-3 block font-sans text-base font-normal leading-relaxed text-inherit antialiased">
          Follows: 0 Followers: 0
        </p>
      </div>
    </div>
  );
};

export default Profile;