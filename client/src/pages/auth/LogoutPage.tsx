import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const LogoutPage: React.FC = () => {
    const navigate = useNavigate();

    useEffect(() => {
        const handleLogut = (): void => {
            localStorage.removeItem('authToken');
            localStorage.removeItem('authUsername');

            navigate('/landing');
        }

        handleLogut();
    }, [navigate]);

    return (
        <div className="flex items-center justify-center h-screen bg-gray-100">
          <div className="text-center">
            <h1 className="text-2xl font-bold mb-4">Logging out...</h1>
            <p className="text-gray-600">Please wait while we log you out.</p>
          </div>
        </div>
      );
}

export default LogoutPage;