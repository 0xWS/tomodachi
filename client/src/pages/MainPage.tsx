import { useEffect, useState } from "react";
import NavBar from "../components/core/NavBar";
import PostList from "../components/PostList";
import Profile from "../components/Profile";
import axios from "axios";

const MainPage: React.FC<any> = () => {
    const [profile, setProfile] = useState<string | null>(null);
    const [posts, setPosts] = useState<any[]>([]);

    useEffect(() => {
        const getProfile = () => {
            setProfile(localStorage.getItem('authUsername'));
        }

        getProfile();
    }, []);

    useEffect(() => {
        const fetchAllPosts = async () => {
            try {
                const response = await axios.get<any[]>(`/api/posts`,
                    {
                      headers: {
                        'Authorization': `Bearer ${localStorage.getItem('authToken')}`,
                        'Content-Type': 'application/json'
                      } 
                    }
                );
                setPosts(response.data);
            } catch (error) {
                console.error("Error fetching user data:", error);
            }
        };

        fetchAllPosts();
    }, []);

    return (
        <div className="min-h-screen bg-gray-100">
            <NavBar />
            <div className="container mx-auto px-1 py-4">
                <div className="flex flex-col md:flex-row gap-8">
                    <div className="w-full md:w-1/4">
                        <Profile username={profile || "NAME_MISSING"}/>
                    </div>
                    <div className="w-full md:w-3/4">
                        <PostList posts={posts}/>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default MainPage;