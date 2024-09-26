interface PostProps {
    post: any;
}

const Post: React.FC<PostProps> = ({post}) => {
    return (
        <div 
            className="mb-3 min-w-[46rem] whitespace-normal break-words rounded-lg border border-blue-gray-50 bg-white p-4 font-sans text-sm font-normal text-blue-gray-500 shadow-lg shadow-blue-gray-500/10 focus:outline-nonepost"
        >
            <p className="block font-sans text-sm font-normal leading-normal text-black-700 antialiased">
                {post.userDisplayName}
                <span className="ml-2 text-gray-500"> 
                    @{post.userUserName}
                </span>
            </p>
            <p className="block font-sans text-sm font-normal leading-normal text-gray-700 antialiased">
                {post.content}
            </p>
            <div className="mt-4 flex items-center gap-5">
                <div className="flex items-center gap-1">
                    ❤️{post.likeCount}
                </div>
                <div className="block font-sans text-xs font-normal text-gray-700 antialiased">
                    {post.createdAt}
                </div>
            </div>
        </div>
    )
}

export default Post;