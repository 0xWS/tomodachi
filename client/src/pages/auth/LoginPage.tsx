import { ChangeEvent, FormEvent, useState } from "react";

import './AuthPage.css';
import axios, { AxiosResponse } from "axios";
import { useNavigate } from "react-router-dom";

interface UserLogin {
    username: string;
    password: string;
}

const LoginPage: React.FC = () => {
    
    const navigate = useNavigate();

    const [userLogin, setUserLogin] = useState<UserLogin>({
        username: '',
        password: '',
    });

    const loginUser = async () => {
        try {
            const res: AxiosResponse<string> = await axios.post<string>(`/api/users/login`, {
                username: userLogin.username,
                password: userLogin.password,
            });
            if (res.status === 200) {
                localStorage.setItem('jwtToken', res.data);
                navigate(`/profile/${userLogin.username}`);
            }
        } catch (err) {
            console.error(err);
        }
    }

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setUserLogin(prev => ({ ...prev, [name]: value }));
    }

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        loginUser();
    };

    return (
        <div className="authPage">
            <div className="auth">
                <h2>Login</h2>
                <form onSubmit={handleSubmit}>
                    <input
                        type="text"
                        name="username"
                        placeholder="username"
                        value={userLogin.username}
                        onChange={handleChange}
                    />
                    <input
                        type="text"
                        name="password"
                        placeholder="password"
                        value={userLogin.password}
                        onChange={handleChange}
                    />
                    <button type="submit">Login</button>
                </form>
            </div>
        </div>
    )
}

export default LoginPage;