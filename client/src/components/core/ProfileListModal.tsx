import React from "react";

export interface IProfile {
    id: number;
    username: string;
    displayName: string;
}

interface ProfileListModalProps {
    users: IProfile[];
    title: string;
    onClose: () => void;
}

const ProfileListModal: React.FC<ProfileListModalProps> = ({users, title, onClose}) => {
    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
        <div className="bg-white rounded-lg p-6 w-full max-w-md">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold">{title}</h2>
            <button
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700"
            >
              ✕
            </button>
          </div>
          <ul className="max-h-96 overflow-y-auto">
            {users.map((user: IProfile) => (
              <li key={user.id} className="py-2 border-b last:border-b-0">
                <a href={`/profile/${user.username}`} className="flex items-center hover:bg-gray-100 p-2 rounded">
                  <div className="flex-grow">
                    <p className="font-semibold">{user.displayName}</p>
                    <p className="text-sm text-gray-500">@{user.username}</p>
                  </div>
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    )
};

export default ProfileListModal;