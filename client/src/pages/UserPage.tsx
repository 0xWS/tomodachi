import Profile from "../components/Profile";
import "./UserPage.css"

const UserPage: React.FC<any> = () => {
    return (
        <div className="userPage">
            <Profile userId="10"/>
        </div>
    )
}

export default UserPage;