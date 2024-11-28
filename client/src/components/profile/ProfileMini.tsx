import React, { useEffect, useState } from 'react';
import { getUserProfile, IUserProfile } from '../../apis/profileApi';

const ProfileMini: React.FC = () => {
  const [userData, setUserData] = useState<IUserProfile | null>(null);
  const [profilePicture, setProfilePicture] = useState<string | null>(null);
  const [userFollowerCount, setUserFollowerCount] = useState<number>(0);
  const [userFollowsCount, setUserFollowCount] = useState<number>(0);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const username = localStorage.getItem('authUsername');
        if (!username) throw new Error('User not logged in!');
        const userDataResponse = await getUserProfile(username);
        setUserData(userDataResponse.data);

        if (userDataResponse.data.profilePicture) {
          const base64Data = userDataResponse.data.profilePicture;
          setProfilePicture(`data:image/jpeg;base64,${base64Data}`);
        }

        setUserFollowerCount(userDataResponse.data.user.followerCount);
        setUserFollowCount(userDataResponse.data.user.followingCount);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUserData();
  }, []);

  return (
    <div className="max-w-[24rem] flex items-center rounded-lg border border-blue-gray-50 bg-white bg-clip-border text-gray-700 shadow-lg shadow-blue-gray-500/10">
      {profilePicture ? (
        <img src={profilePicture} alt="Profile" className="h-16 w-16 mr-4 ml-2 rounded-full object-cover" />
      ) : (
        <img src="http://localhost:3000/default-avatar.jpg" alt="Profile" className="h-16 w-16 mr-4 ml-2 rounded-full object-cover" />
      )}
      <div className="flex flex-col p-1 justify-center">
        { userData && (
          <>
            <a href={`/profile/${userData.user.username}`}>
              <h4 className="font-sans text-xl font-semibold leading-snug tracking-normal text-blue-gray-900 antialiased">{userData?.displayName}</h4>
              <p className="block font-sans text-base font-normal leading-relaxed text-inherit antialiased">@{userData?.user.username}</p>
            </a>
            <div className="flex items-center mt-1">
              <p className="block font-sans font-normal leading-relaxed text-gray-700 antialiased">Followers: {userFollowerCount}&nbsp;</p>
              <p className="block font-sans font-normal leading-relaxed text-gray-700 antialiased">Follows: {userFollowsCount}</p>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default ProfileMini;