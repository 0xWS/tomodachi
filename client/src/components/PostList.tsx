
import './PostList.css';
import Post from "./Post";

interface PostListProps {
    posts: any[];
}

const PostList: React.FC<PostListProps> = ({posts}) => {
    
    return (
        <div className="postList">
            {posts.map((post: any) => {
                return (
                    <Post post={post} key={post.id} />
                );
            })}
        </div>
    )
} 

export default PostList;