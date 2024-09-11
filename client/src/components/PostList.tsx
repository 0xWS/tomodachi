import { useEffect, useState } from "react";

import './PostList.css';
import axios from "axios";
import Post from "./Post";

interface PostListProps {
    userId: string;
}

const PostList: React.FC<PostListProps> = ({userId}) => {
    const [userPosts, setUserPosts] = useState<any[]>([]);

    useEffect(() => {
        const fetchUserPosts = async () => {
            try {
                const response = await axios.get<any[]>(`/api/posts/${userId}`);
                setUserPosts(response.data);
            } catch (error) {
                console.error("Error fetching user data:", error);
            }
        };

        fetchUserPosts();
    }, [userId]);
    
    return (
        <div className="postList">
            {userPosts.map((post: any) => {
                return (
                    <Post post={post} />
                );
            })}
        </div>
    )
} 

export default PostList;