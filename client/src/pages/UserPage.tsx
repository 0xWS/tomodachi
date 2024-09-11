import PostList from "../components/PostList";
import Profile from "../components/Profile";
import "./UserPage.css"

const UserPage: React.FC<any> = () => {

    return (
        <div className="userPage">
            <div>
                <Profile userId="10"/>
            </div>
            <div>
                <PostList userId="10"/>
            </div>
            <div>_BAR_</div>
        </div>
    )
}

export default UserPage;