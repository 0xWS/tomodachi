import { useState, useEffect } from 'react';
import { IPostAuthor } from '../../types/Post';
import { getUserProfile, IUserProfile } from '../../apis/profileApi';

interface ProfileHoverCardProps {
  author: IPostAuthor;
  position: { x: number, y: number } | null;
}

const ProfileHoverCard: React.FC<ProfileHoverCardProps> = ({ author, position }) => {
  const [profile, setProfile] = useState<IUserProfile | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchProfile = async () => {
      if (!author.username) return;
      
      setLoading(true);
      try {
        const response = await getUserProfile(author.username);
        const data = await response.data;
        setProfile(data);
      } catch (error) {
        console.error('Error fetching profile:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [author.username]);

  if (!position) return null;

  return (
    <div 
      className="absolute z-50 w-80 bg-white rounded-lg shadow-lg border p-4"
      style={{
        left: position.x,
        top: position.y + 10,
        transform: `translateX(${position.x > window.innerWidth - 320 ? '-100%' : '0'})`
      }}
    >
      {loading ? (
        <div className="flex items-center justify-center h-24">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900" />
        </div>
      ) : (
        <div className="space-y-4">
          <div className="flex items-start gap-4">
            {author.profilePictureBase64 ? (
              <img
                src={`data:image/jpeg;base64,${author.profilePictureBase64}`}
                alt={`${author.displayName}'s profile`}
                className="h-12 w-12 rounded-full border"
              />
            ) : (
              <img
                src="/default-avatar.png"
                alt={`${author.displayName}'s profile`}
                className="h-12 w-12 rounded-full border"
              />
            )}
            <div className="space-y-1">
              <h4 className="text-sm font-semibold">{author.displayName}</h4>
              <p className="text-sm text-gray-500">@{author.username}</p>
            </div>
          </div>
          

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
  );
};

export default ProfileHoverCard;