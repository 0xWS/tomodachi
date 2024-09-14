import { useRef, useState } from "react";

import './PostModal.css';
import axios from "axios";

interface PostModalProps {
    isOpen: boolean;
    onClose: () => void;
} 

const PostModal: React.FC<PostModalProps> = ({ isOpen, onClose }) => {
    const [ content, setContent ] = useState('');
    const modalRef = useRef<HTMLDivElement>(null);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setContent('');
        onClose();

        try {
            const res = await axios.post<any>(`/api/posts`,
                { content: content },
                {
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem('authToken')}`,
                        'Content-Type': 'application/json'
                    }
                }
            );
            console.log(res);
        } catch (error) {
            console.error("Error posting post: ", error);
        } finally {
            setContent('');
            onClose();
        }
    }

    if (!isOpen) return null;

    return (
        <div className="post-modal-overlay" onClick={onClose}>
            <div className="post-modal-content" ref={modalRef} onClick={(e) => e.stopPropagation()}>
                <form onSubmit={handleSubmit}>
                    <div>
                        <label htmlFor="title">Title:</label>
                        <textarea
                            id="content"
                            value={content}
                            onChange={(e) => setContent(e.target.value)}
                            required
                        />
                    </div>
                    <div className="post-modal-actions">
                        <button type="submit">Post</button>
                        <button type="button" onClick={onClose}>Cancel</button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default PostModal;