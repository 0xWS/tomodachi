import { useEffect, useState } from "react";
import PostList from "../components/core/PostList";
import axios from "axios";
import ProfileMini from "../components/profile/ProfileMini";
import ProfileRecommendations from "../components/profile/ProfileRecommendations";
import Trending from "../components/core/Trending";
import ProfileSettings from "../components/profile/ProfileSettings";
import PostCreator from "../components/core/PostCreator";

const MainPage: React.FC<any> = () => {
    const [posts, setPosts] = useState<any[]>([]);

    useEffect(() => {
        const fetchAllPosts = async () => {
            try {
                const response = await axios.get<any>(`/api/posts/feed`,
                    {
                      headers: {
                        'Authorization': `Bearer ${localStorage.getItem('authToken')}`,
                        'Content-Type': 'application/json'
                      } 
                    }
                );
                setPosts(response.data.content);
            } catch (error) {
                console.error("Error fetching user data:", error);
            }
        };

        fetchAllPosts();
    }, []);

    return (
        <div className="min-h-screen bg-gray-100 pt-2">
            <div className="container mx-auto px-[8rem]">
                <div className="flex flex-col md:flex-row gap-4">
                    <div className="w-full md:w-1/4">
                        <input
                            type="text"
                            className="w-full justify-center mb-2 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 border border-blue-gray-50 ring-gray-300 hover:bg-gray-50 shadow-lg shadow-blue-gray-500/10"
                            placeholder="Search"
                        />
                        <ProfileMini/>
                        <ProfileRecommendations/>
                        <Trending></Trending>
                        <ProfileSettings></ProfileSettings>
                        <footer className="text-sm p-4 text-gray-500">
                            <div className="container mx-auto flex flex-col md:flex-row items-center">
                                <div className="flex flex-col md:flex-row md:space-x-4">
                                    <a href="#" className="hover:text-white">Terms of Service</a>
                                    <a href="#" className="hover:text-white">Cookies</a>
                                    <p>&copy; 2024 Tomodachi</p>
                                </div>
                            </div>
                        </footer>
                    </div>
                    <div className="w-full md:w-3/4">
                        <PostCreator></PostCreator>
                        <PostList posts={posts}/>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default MainPage;