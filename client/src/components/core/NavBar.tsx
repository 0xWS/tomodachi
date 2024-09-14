import { useEffect, useState } from 'react';
import './NavBar.css';
import Dropdown from './Dropdown';
import PostModal from './PostModal';

const NavBar: React.FC = () => {

    const [profile, setProfile] = useState<string | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    useEffect(() => {
        const getProfile = () => {
            setProfile(localStorage.getItem('authUsername'));
        }

        getProfile();
    });

    const handleOpenModal = () => {
        setIsModalOpen(true);
    }

    const handleCloseModal = () => {
        setIsModalOpen(false);
    }

    return (
        <>
            <ul className="navbar">
                <li>TOMODACHI</li>
                <li>🏠</li>
                <li>📧</li>
                <div className="right-aligned clickable">
                    <li><button className="last" onClick={handleOpenModal}>🖊️</button></li>
                    <Dropdown 
                        trigger={<li className="last">{profile}🔽</li>}
                        menu={[
                            <a href={`/profile/${profile}`}>{profile}</a>,
                            <a href="/logout" key="logout">Logout</a>
                        ]}
                    />
                </div>
            </ul>
            <PostModal
                isOpen={isModalOpen}
                onClose={handleCloseModal}
            />
        </>
    );
}

export default NavBar;