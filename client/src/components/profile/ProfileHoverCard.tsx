import React, { useState, useEffect, useRef } from 'react';
import { getUserProfile, IUserProfile } from '../../apis/profileApi';

interface ProfileHoverCardProps {
  username: string;
  children: React.ReactNode;
}

const ProfileHoverCard: React.FC<ProfileHoverCardProps> = ({ username, children }) => {
  const [profile, setProfile] = useState<IUserProfile | null>(null);
  const [loading, setLoading] = useState(false);

  const profileRef = useRef<HTMLDivElement>(null);
  const [showCard, setShowCard] = useState<boolean>(false);
  const [position, setPosition] = useState<{x: number, y: number} | null>(null);

  useEffect(() => {
    const fetchProfile = async () => {
      if (!username) return;
      
      setLoading(true);
      try {
        const response = await getUserProfile(username);
        const data = await response.data;
        setProfile(data);
      } catch (error) {
        console.error('Error fetching profile:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [username]);

  useEffect(() => {
    console.log(showCard, profileRef);
    if (showCard && profileRef.current) {
        const rect = profileRef.current.getBoundingClientRect();
        setPosition({
            x: rect.left,
            y: rect.top
        });
    }
  }, [showCard]);

  return (
    <div 
      ref={profileRef}
      onMouseEnter={() => setShowCard(true)}
      onMouseLeave={() => setShowCard(false)}
    >
      {children}
      {showCard && position && (
        <div 
          className="absolute z-50 w-80 bg-white rounded-lg shadow-lg border p-4"
          style={{
            left: position.x,
            top: position.y + 10,
            transform: `translateX(${position.x > window.innerWidth - 320 ? '-100%' : '0'})`
          }}
        >
          {loading? (
            <div className="flex items-center justify-center h-24">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900" />
            </div>
          ) : (
            <div className="space-y-4">
              {profile && (
                <div className="flex items-start gap-4">
                  {profile?.profilePicture ? (
                    <img
                      src={`data:image/jpeg;base64,${profile.profilePicture}`}
                      alt={`${profile.displayName}'s profile`}
                      className="h-12 w-12 rounded-full border"
                    />
                  ) : (
                    <img
                      src="/default-avatar.png"
                      alt={`${profile.displayName}'s profile`}
                      className="h-12 w-12 rounded-full border"
                    />
                  )}
                  <div className="space-y-1">
                    <h4 className="text-sm font-semibold">{profile.displayName}</h4>
                    <p className="text-sm text-gray-500">@{username}</p>
                  </div>
                </div>
              )}
              {profile?.description && (
                <p className="text-sm text-gray-500 line-clamp-3">
                  {profile.description}
                </p>
              )}
              <p className="block font-sans text-sm font-normal leading-relaxed text-inherit antialiased">
                <span className="block">
                  <span className="mr-2">
                    Follows: {profile?.user.followingCount}
                  </span>
                  <span>
                    Followers: {profile?.user.followerCount}
                  </span>
                </span>
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default ProfileHoverCard;