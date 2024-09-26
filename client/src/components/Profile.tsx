import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { useNotifications } from './core/NotificationProvider';


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
  const { showNotification } = useNotifications();

  const [userData, setUserData] = useState<UserData | null>(null);
  const [userFollowers, setUserFollowers] = useState<number>(0);
  const [userFollows, setUserFollows] = useState<number>(0);
  const [isFollowed, setIsFollowed] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchUserData = async () => {
      setLoading(true);
      try {
        if(username !== "NAME_MISSING") {
          const userDataResponse = await axios.get<UserData>(`/api/userProfile/${username}`);
          const isFollowedResponse = await axios.get<boolean>(`/api/follows/isFollowed/${userDataResponse.data.id}`,
            {
              headers: {
                'Authorization': `Bearer ${localStorage.getItem('authToken')}`,
                'Content-Type': 'application/json'
              } 
            }
          );
          setUserData(userDataResponse.data);
          setUserFollowers(userDataResponse.data.user.followerCount);
          setUserFollows(userDataResponse.data.user.followingCount);
          setIsFollowed(isFollowedResponse.data);
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [username]);

  async function handleFollow() {
    if (userData && userData.id) {
      try {
        if (isFollowed) {
          const res = await axios.delete<any>(`/api/follows/unfollow/${userData.id}`,
            {
              headers: {
                'Authorization': `Bearer ${localStorage.getItem('authToken')}`,
                'Content-Type': 'application/json'
              } 
            }
          );
          setIsFollowed(false);
          setUserFollowers(userFollowers-1);
          showNotification("Unfollowed!")
        } else {
          const res = await axios.post<any>(`/api/follows/follow/${userData.id}`,
            {},
            {
              headers: {
                'Authorization': `Bearer ${localStorage.getItem('authToken')}`,
                'Content-Type': 'application/json'
              } 
            }
          );
          setIsFollowed(true);
          setUserFollowers(userFollowers+1);
          showNotification("Followed!")
        }
      } catch (error) {
        console.error("Error posting ppost: ", error);
      }
    } 
  }

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
        <p className="block font-sans text-base font-normal leading-relaxed text-inherit antialiased">
          <span className="mb-2 block">
            Follows: {userFollows} Followers: {userFollowers}
          </span>
          <button
            className="w-full justify-center gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
            onClick={handleFollow}
          >
            { isFollowed ? "Unfollow" : "Follow"}
          </button>
        </p>
      </div>
    </div>
  );
};

export default Profile;