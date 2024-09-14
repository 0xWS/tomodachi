import { useEffect, useState } from "react";

import './PostList.css';
import axios from "axios";
import Post from "./Post";

interface PostListProps {
    username: string;
}

const PostList: React.FC<PostListProps> = ({username}) => {
    const [userPosts, setUserPosts] = useState<any[]>([]);

    useEffect(() => {
        const fetchUserPosts = async () => {
            try {
                const response = await axios.get<any[]>(`/api/posts/${username}`);
                setUserPosts(response.data);
            } catch (error) {
                console.error("Error fetching user data:", error);
            }
        };

        fetchUserPosts();
    }, [username]);
    
    return (
        <div className="postList">
            {userPosts.map((post: any) => {
                return (
                    <Post post={post} key={post.id} />
                );
            })}
        </div>
    )
} 

export default PostList;