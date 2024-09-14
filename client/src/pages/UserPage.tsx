import { useParams } from "react-router-dom";
import PostList from "../components/PostList";
import Profile from "../components/Profile";
import "./UserPage.css"

const UserPage: React.FC = () => {

    const { username } = useParams<{ username: string }>();

    if (username) {
        return (
            <div className="userPage">
                <div>
                    <Profile username={username}/>
                </div>
                <div>
                    <PostList username={username}/>
                </div>
                <div>_BAR_</div>
            </div>
        )
    } else {
        return (
            <>no user id</>
        )
    }
}

export default UserPage;