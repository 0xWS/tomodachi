export interface IPost {
    id: number;
    content: string;
    userUserName: string;
    userDisplayName: string;
    likeCount: number;
    replyCount: number;
    likedByCurrentUser: boolean;
    createdAt: string;
    author: IPostAuthor;
}

export interface IPostAuthor {
    id: number;
    displayName: string;
    username: string;
    profilePictureBase64: string;
}