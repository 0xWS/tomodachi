import React from 'react';
import './App.css';
import UserPage from './pages/UserPage';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LoginPage from './pages/auth/LoginPage';
import RegisterPage from './pages/auth/RegisterPage';
import MainPage from './pages/MainPage';

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<MainPage />} />
        <Route path="/auth/login" element={<LoginPage />} />
        <Route path="/auth/Register" element={<RegisterPage />} />
        <Route path="/profile/:username" element={<UserPage />} />
      </Routes>
    </Router>
  );
}

export default App;