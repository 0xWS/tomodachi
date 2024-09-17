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
                const response = await axios.get<any[]>(`/api/posts`);
                setPosts(response.data);
            } catch (error) {
                console.error("Error fetching user data:", error);
            }
        };

        fetchAllPosts();
    }, []);

    return (
        <>
            <NavBar />
            <div className="userPage">
                <div className="userProfile">
                    <Profile username={profile || "NAME_MISSING"}/>
                </div>
                <div className="userPosts">
                    <PostList posts={posts}/>
                </div>
            </div>
        </>
    )
}

export default MainPage;