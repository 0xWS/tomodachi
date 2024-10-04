import { useEffect, useState } from "react";
import { getLikers, hasUserLikedPost, likePost, unlikePost } from "../apis/postLikeApi";
import { useNotifications } from "./core/NotificationProvider";
import { formatRelativeTime } from "../utils/dateUtils";
import ProfileListModal, { IProfile } from "./core/ProfileListModal";

interface Post {
    id: number;
    content: string;
    userUserName: string;
    userDisplayName: string;
    likeCount: number;
    createdAt: string;
}

interface PostProps {
    post: Post;
}

const Post: React.FC<PostProps> = ({post}) => {
    const { showNotification } = useNotifications();
    const [showLikers, setShowLikers] = useState(false);
    const [likers, setLikers] = useState<IProfile[]>([]);
    const [isLiked, setIsLiked] = useState(false);
    const [likeCount, setLikeCount] = useState(post.likeCount);

    const relativeTime = formatRelativeTime(post.createdAt);
    const fullTimestamp = new Date(post.createdAt).toLocaleString();

    useEffect(() => {
        checkLikeStatus();
    }, []);

    const checkLikeStatus = async () => {
        try {
            const response = await hasUserLikedPost(post.id);
            setIsLiked(response.data);
        } catch (error) {
            console.error('Error checking like status:', error);
        }
    }

    const handleLikeClick = async () => {
        try {
            setIsLiked(!isLiked);
            if (isLiked) {
                setLikeCount(likeCount - 1);
                await unlikePost(post.id);
            } else {
                setLikeCount(likeCount  +  1);
                await likePost(post.id);
            }
        } catch (error) {
            showNotification("Error liking / unliking!", 'error');
            console.log(error);
            setIsLiked(!isLiked);
        }
    }

    const handleGetLikers = async () => {
        try {
            console.log('Getting likers...');
            const response = await getLikers(post.id);
            setLikers(response.data);
            setShowLikers(!showLikers);
        } catch (error) {
            showNotification("Error getting likers!", 'error');
            console.log(error);
        }
    }
    
    return (
        <div 
            className="mb-3 min-w-[46rem] whitespace-normal break-words rounded-lg border border-blue-gray-50 bg-white p-4 font-sans text-sm font-normal text-blue-gray-500 shadow-lg shadow-blue-gray-500/10 focus:outline-nonepost"
        >
            <a href={`/profile/${post.userUserName}`}>
                <p className="block font-sans text-sm font-normal leading-normal text-black-700 antialiased">
                    {post.userDisplayName}
                    <span className="ml-2 text-gray-500"> 
                        @{post.userUserName}
                    </span>
                </p>
            </a>
            <p className="block font-sans text-sm font-normal leading-normal text-gray-700 antialiased">
                {post.content}
            </p>
            <div className="mt-4 flex items-center gap-5">
                <div className="flex items-center gap-1">
                <button 
                    className="flex items-center text-base gap-1 focus:outline-none"
                    onClick={handleLikeClick}>
                    {isLiked ? '❤️' : '💙'}
                </button>
                <button 
                    className="flex items-center text-base gap-1"
                    onClick={handleGetLikers}>
                    {likeCount}
                </button>
                </div>
                <div
                    className="block font-sans text-xs font-normal text-gray-700 antialiased"
                    title={fullTimestamp}
                >
                    {relativeTime}
                </div>

                {showLikers && (
                    <ProfileListModal
                        users={likers}
                        title="Who liked this"
                        onClose={() => setShowLikers(false)}
                    />
                )}
            </div>
        </div>
    )
}

export default Post;