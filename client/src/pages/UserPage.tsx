import { useParams } from "react-router-dom";
import PostList from "../components/PostList";
import Profile from "../components/Profile";
import "./UserPage.css"
import NavBar from "../components/core/NavBar";

const UserPage: React.FC = () => {

    const { username } = useParams<{ username: string }>();

    if (username) {
        return (
            <>
                <NavBar />
                <div className="userPage">
                    <div className="userProfile">
                        <Profile username={username}/>
                    </div>
                    <div className="userPosts">
                        <PostList username={username}/>
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