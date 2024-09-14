import { ChangeEvent, FormEvent, useState } from "react";
import { useNavigate } from "react-router-dom";

import './AuthPage.css';
import axios from "axios";

interface UserRegister {
    username: string;
    email: string;
    password: string;
}

const RegisterPage: React.FC = () => {

    const navigate = useNavigate();

    const [userRegister, setUserRegister] = useState<UserRegister>({
        username: '',
        email: '',
        password: '',
    });

    const registerUser = async () => {
        try {
            const res = await axios.post(`/api/users/register`, {
                username: userRegister.username,
                email: userRegister.email,
                password: userRegister.password
            });
            if (res.status === 200) {
                navigate('/auth/login');
            } else {
                //TODO: ERROR HANDLE
            }
        } catch (err) {
            console.error(err);
        }
    }

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setUserRegister(prev => ({ ...prev, [name]: value }));
    }

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        registerUser();
    };

    return (
        <div className="authPage">
            <div className="auth">
                <h2>Register</h2>
                <form onSubmit={handleSubmit}>
                    <input
                        type="text"
                        name="username"
                        placeholder="username"
                        value={userRegister.username}
                        onChange={handleChange}
                    />
                    <input
                        type="email"
                        name="email"
                        placeholder="email"
                        value={userRegister.email}
                        onChange={handleChange}
                    />
                    <input
                        type="text"
                        name="password"
                        placeholder="password"
                        value={userRegister.password}
                        onChange={handleChange}
                    />
                    <button type="submit">Register</button>
                </form>
            </div>
        </div>
    )
}

export default RegisterPage;