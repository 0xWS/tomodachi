import { useParams } from "react-router-dom";
import PostList from "../components/core/PostList";
import Profile from "../components/profile/Profile";
import NavBar from "../components/core/NavBar";
import axios from "axios";
import { useEffect, useState } from "react";

const UserPage: React.FC = () => {

    const { username } = useParams<{ username: string }>();

    const [userPosts, setUserPosts] = useState<any[]>([]);

    useEffect(() => {
        const fetchUserPosts = async () => {
            try {
                const response = await axios.get<any>(`/api/posts/feed/${username}`,
                    {
                      headers: {
                        'Authorization': `Bearer ${localStorage.getItem('authToken')}`,
                        'Content-Type': 'application/json'
                      } 
                    }
                );
                setUserPosts(response.data.content);
            } catch (error) {
                console.error("Error fetching user data:", error);
            }
        };

        fetchUserPosts();
    }, [username]);

    if (username) {
        return (
            <div className="min-h-screen bg-gray-100">
                <NavBar />
                <div className="container mx-auto px-1 py-4">
                    <div className="flex flex-col md:flex-row gap-8">
                        <div className="w-full md:w-1/4">
                            <Profile username={username}/>
                        </div>
                        <div className="w-full md:w-3/4">
                            <PostList posts={userPosts}/>
                        </div>
                    </div>
                </div>
            </div>
        )
    } else {
        return (
            <>no user id</>
        )
    }
}

export default UserPage;