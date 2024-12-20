import axios from "axios";
import { useState } from "react";

const PostCreator: React.FC<any> = ({}) => {
    const [content, setContent] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setContent('');

        try {
            const res = await axios.post<any>(`/api/posts`, { content }, {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('authToken')}`,
                    'Content-Type': 'application/json'
                }
            });
        } catch (error) {
            console.error("Error posting post: ", error);
        } finally {
            setContent('');
        }
    };

    
    return (
        <div className="mb-3 h-[8.75rem] w-full whitespace-normal break-words rounded-lg border border-blue-gray-50 bg-white p-4 font-sans text-sm font-normal text-blue-gray-500 shadow-lg shadow-blue-gray-500/10 focus:outline-nonepost">
            <form onSubmit={handleSubmit}>
                <div className="w-full">
                    <textarea
                        id="content"
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        placeholder="How are you?"
                        required
                        className="block w-full p-2 mb-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                    />
                </div>
                <div className="post-modal-actions">
                    <button type="submit" className="bg-blue-500 text-white py-1 px-4 rounded-md font-semibold hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500">Post</button>
                </div>
            </form>
        </div>
    );
}

export default PostCreator;