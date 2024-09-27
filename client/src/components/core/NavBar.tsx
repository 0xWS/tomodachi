import { useEffect, useState } from 'react';
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
            <div className="bg-stone-100 p-4">
                <div className="container mx-auto flex justify-between items-center">
                    <a className="text-black font-bold text-xl" href="/">TOMODACHI</a>
                    <ul className="flex space-x-2">
                        <li className="w-full justify-center gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50">
                            <a href="/">🏠</a>
                        </li>
                        {profile ? 
                            <li>
                                <button className="w-full justify-center gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50" onClick={handleOpenModal}>
                                    Write
                                </button>
                            </li>
                            : 
                            null
                        }
                        <li>
                        </li>
                        {profile ? (
                            <Dropdown 
                                text={profile}
                                menu={[
                                    { href: `/profile/${profile}`, label: profile },
                                    { href: "/auth/logout", label: "Logout" }
                                ]}
                            />
                        ) : null}
                    </ul>
                </div>
            </div>
            <PostModal
                isOpen={isModalOpen}
                onClose={handleCloseModal}
            />
        </>
    );
}

export default NavBar;