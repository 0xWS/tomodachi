import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { useNotifications } from './core/NotificationProvider';
import useApi from '../hooks/useApi';
import ProfileListModal from './core/ProfileListModal';
import { IProfile } from './core/ProfileListModal';
import { getUserProfile, IUserProfile, updateUserProfile } from '../apis/profileApi';
import { followUser, getFollowers, getFollows, getIsFollowed, unfollowUser } from '../apis/followsApi';

interface UserProfileProps {
    username: string;
}

const Profile: React.FC<UserProfileProps> = ({username}) => {
  const { showNotification } = useNotifications();
  const api = useApi<any>();

  const [showFollowers, setShowFollowers] = useState(false);
  const [showFollows, setShowFollows] = useState(false);
  const [userFollowers, setUserFollowers] = useState<IProfile[]>([]);
  const [userFollows, setUserFollows] = useState<IProfile[]>([]);

  const [userData, setUserData] = useState<IUserProfile | null>(null);
  const [userFollowerCount, setUserFollowerCount] = useState<number>(0);
  const [userFollowsCount, setUserFollowCount] = useState<number>(0);
  const [isFollowed, setIsFollowed] = useState<boolean>(false);

  const [editedDisplayName, setEditedDisplayName] = useState<string>('');
  const [editedDescription, setEditedDescription] = useState<string>('');
  const [isEditing, setIsEditing] = useState<boolean>(false);

  const [loading, setLoading] = useState<boolean>(true);

  const isMe = localStorage.getItem('authUsername') === username;

  useEffect(() => {
    const fetchUserData = async () => {
      setLoading(true);
      try {
        if(username !== "NAME_MISSING") {
          const userDataResponse = await getUserProfile(username);
          const isFollowedResponse = await getIsFollowed(userDataResponse.data.id);
          setUserData(userDataResponse.data);
          setUserFollowerCount(userDataResponse.data.user.followerCount);
          setUserFollowCount(userDataResponse.data.user.followingCount);
          setIsFollowed(isFollowedResponse.data);
          
          setEditedDisplayName(userDataResponse.data.displayName);
          setEditedDescription(userDataResponse.data.description);
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [username]);

  const renderDescription = (description: string) => {
    return description.split('\n').map((line, index) => (
      <React.Fragment key={index}>
        {line}
        {index < description.split('\n').length -1 && <br/>}
      </React.Fragment>
    ));
  }

  const handleFollow = async () => {
    if (userData && userData.id) {
      try {
        if (isFollowed) {
          await unfollowUser(userData.id);
          setIsFollowed(false);
          setUserFollowerCount(userFollowerCount-1);
          showNotification("Unfollowed!")
        } else {
          await followUser(userData.id);
          setIsFollowed(true);
          setUserFollowerCount(userFollowerCount+1);
          showNotification("Followed!")
        }
      } catch (error) {
        showNotification("Error following / unfollowing!", 'error');
        console.error("Error following / unfollowing: ", error);
      }
    }
  }

  const handleEdit = () => {
    setIsEditing(true);
  }

  const handleSave = async () => {
    try {
      const res = await updateUserProfile({
        displayName: editedDisplayName,
        description: editedDescription
      });
      if (userData && res.status === 200) {
        const updatedUserData = {
          ...userData,
          displayName: editedDisplayName,
          description: editedDescription
        };
        setUserData(updatedUserData);
      }
      showNotification("Profile saved successfully!");
    } catch (error) {
      showNotification("Error saving profile! Please try again.", 'error');
      console.error("Error saving profile: ", error);
    } finally {
      setIsEditing(false);
    }
  }

  const handleGetFollowers = async () => {
    try {
      if(!userData) throw new Error('User data not found!');
      const response = await getFollowers(userData.id);
      setUserFollowers(response.data);
      setShowFollowers(!showFollowers);
    } catch (error) {
      showNotification("Error getting followers!", 'error');
      console.log(error);
    }
  }

  const handleGetFollows = async () => {
      try {
        if(!userData) throw new Error('User data not found!');
        const response = await getFollows(userData.id);
        setUserFollows(response.data);
        setShowFollows(!showFollows);
      } catch (error) {
        showNotification("Error getting follows!", 'error');
        console.log(error);
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
        { isEditing ? (
          <input
            type='text'
            value={editedDisplayName}
            onChange={(e) => setEditedDisplayName(e.target.value)}
            placeholder="display name"
            style={{
              fontSize: '1.5rem',
              fontWeight: 600,
            }}
            className="max-w-[12rem] h-[2rem] px-0 px-1 mt-0 text-gray-700 bg-white border-b focus:border-blue-400 focus:outline-none"
          />
        ) : (
          <h4 className="block font-sans h-[2rem] text-2xl font-semibold leading-snug tracking-normal text-blue-gray-900 antialiased">
            {userData.displayName}
          </h4>
        )}
        <p className="block font-sans text-base font-normal leading-relaxed text-inherit antialiased">
          @{userData.user.username}
        </p>
        { isEditing ? (
          <textarea
            value={editedDescription}
            onChange={(e) => setEditedDescription(e.target.value)}
            placeholder="description"
            maxLength={70}
            className="px-0 py-1 mt-2 w-[12rem] max-h-[6rem] text-gray-700 bg-white border-b focus:border-blue-400 focus:outline-none"
          />
        ) : (
          <p className="block font-sans text-xl font-normal leading-relaxed text-gray-700 antialiased">
            {renderDescription(userData.description)}
          </p>
        )}
        <p className="block font-sans text-base font-normal leading-relaxed text-inherit antialiased">
          <span className="mb-2 block">
            <span onClick={handleGetFollows}>
              Follows: {userFollowsCount}
            </span>
            <span onClick={handleGetFollowers}>
              Followers: {userFollowerCount}
            </span>
          </span>
          { isMe ? 
            (isEditing ? (
              <button
                className="w-full justify-center gap-x-1.5 rounded-md bg-green-500 px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 disabled:bg-gray-300 disabled:text-gray-400"
                onClick={handleSave}
              >Save</button>
            ) : (
              <button
                className="w-full justify-center gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 disabled:bg-gray-300"
                onClick={handleEdit}
              >Edit profile</button>
            ))
            :
            <button
              className="w-full justify-center gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 disabled:bg-gray-300 disabled:text-gray-400"
              onClick={handleFollow}
            >
              { isFollowed ? "Unfollow" : "Follow"}
            </button>
          }
        </p>
      </div>
      {showFollows && (
          <ProfileListModal
              users={userFollows}
              title="Follows"
              onClose={() => setShowFollows(false)}
          />
      )}
      {showFollowers && (
          <ProfileListModal
              users={userFollowers}
              title="Followers"
              onClose={() => setShowFollowers(false)}
          />
      )}
    </div>
  );
};

export default Profile;