import './Post.css';

interface PostProps {
    post: any;
}

const Post: React.FC<PostProps> = ({post}) => {
    return (
        <div className="post">
            <div className="content">
                {post.content}
            </div>
            <div className="stats">
                <div className="likes">❤️{post.likeCount}</div>
                <div className="createdAt">{post.createdAt} id:{post.id}</div>
            </div>
        </div>
    )
}

export default Post;