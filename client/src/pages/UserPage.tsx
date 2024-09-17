import { useParams } from "react-router-dom";
import PostList from "../components/PostList";
import Profile from "../components/Profile";
import "./UserPage.css"
import NavBar from "../components/core/NavBar";
import axios from "axios";
import { useEffect, useState } from "react";

const UserPage: React.FC = () => {

    const { username } = useParams<{ username: string }>();

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

    if (username) {
        return (
            <>
                <NavBar />
                <div className="userPage">
                    <div className="userProfile">
                        <Profile username={username}/>
                    </div>
                    <div className="userPosts">
                        <PostList posts={userPosts}/>
                    </div>
                </div>
            </>
        )
    } else {
        return (
            <>no user id</>
        )
    }
}

export default UserPage;