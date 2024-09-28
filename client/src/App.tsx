import React, { useEffect, useState } from 'react';
import './App.css';
import UserPage from './pages/UserPage';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import LoginPage from './pages/auth/LoginPage';
import RegisterPage from './pages/auth/RegisterPage';
import MainPage from './pages/MainPage';
import NotificationProvider from './components/core/NotificationProvider';
import 'react-toastify/dist/ReactToastify.css';
import LogoutPage from './pages/auth/LogoutPage';
import LandingPage from './pages/LandingPage';

export const AuthContext = React.createContext<{
  isAuthenticated: boolean;
  setIsAuthenticated: React.Dispatch<React.SetStateAction<boolean>>;
}>({
  isAuthenticated: false,
  setIsAuthenticated: () => {},
})

const PrivateRoute: React.FC<{ element: React.ReactElement }> = ({ element }) => {
  const { isAuthenticated } = React.useContext(AuthContext);

  return isAuthenticated ? element : <Navigate to="/landing" />;
}

const App: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const authToken = localStorage.getItem('authToken');
    const authUsername = localStorage.getItem('authUsername');
    setIsAuthenticated(!!authToken &&!!authUsername);
    setIsLoading(false);
  }, []);
  
  if  (isLoading) {
    return <div>Loading...</div>
  }
  
  return (
    <AuthContext.Provider value={{ isAuthenticated, setIsAuthenticated }}>
      <NotificationProvider>
        <Router>
          <Routes>
            <Route path="/landing" element={<LandingPage />} />
            <Route path="/auth/login" element={<LoginPage />} />
            <Route path="/auth/register" element={<RegisterPage />} />
            <Route path="/auth/logout" element={<LogoutPage />} />
            <Route path='/' element={<PrivateRoute element={<MainPage />} />} />
            <Route path="/profile/:username" element={<PrivateRoute element={<UserPage />} />} />
            <Route path="*" element={<Navigate to="/landing" replace />} />
          </Routes>
        </Router>
      </NotificationProvider>
    </AuthContext.Provider>
  );
}

export default App;