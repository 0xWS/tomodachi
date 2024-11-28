import { useEffect, useState } from "react";
import Dropdown from "../core/Dropdown";

const ProfileSettings: React.FC = () => {
    const [profile, setProfile] = useState<string | null>(null);

    useEffect(() => {
        const getProfile = () => {
            setProfile(localStorage.getItem('authUsername'));
        }

        getProfile();
    });

    if(!profile) return null;

    return (
      <div className="rounded-lg mt-3 shadow-lg shadow-blue-gray-500/10">
        <Dropdown 
          text={profile}
          menu={[
              { href: "/profile/settings", label: "Settings" },
              { href: "/auth/logout", label: "Logout" }
          ]}
        />
      </div>
    )
}

export default ProfileSettings;