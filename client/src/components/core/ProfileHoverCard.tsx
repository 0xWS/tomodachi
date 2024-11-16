import { IPostAuthor } from "../../types/Post"

interface ProfileHoverCardProps {
    author: IPostAuthor;
    position: { x: number, y: number} | null;
}

const ProfileHoverCard: React.FC<ProfileHoverCardProps> = ({ author, position }) => {
    return (
        <div></div>
    )
}

export default ProfileHoverCard;