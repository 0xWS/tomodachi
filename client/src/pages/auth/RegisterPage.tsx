import { ChangeEvent, FormEvent, useState } from "react";
import { useNavigate } from "react-router-dom";

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
        <div className="flex h-screen w-full items-center justify-center bg-white bg-cover bg-no-repeat">
          <div className="rounded-xl bg-gray-300 bg-opacity-50 px-16 py-10 shadow-lg backdrop-blur-md max-sm:px-8">
            <div className="text-white">
              <div className="mb-8 flex flex-col items-center">
                <img src="https://www.svgrepo.com/show/227584/treehouse.svg" width="150" alt="" />
                <h1 className="mb-2 text-2xl text-black">Tomodachi</h1>
                <span className="text-gray-300">Enter Account Details</span>
              </div>
              <form onSubmit={handleSubmit}>
                <div className="mb-4 text-lg">
                  <input
                        type="text"
                        name="username"
                        className="rounded-3xl border-none bg-gray-400 text-black bg-opacity-50 px-6 py-2 text-center text-inherit placeholder-slate-200 shadow-lg outline-none backdrop-blur-md"
                        placeholder="username"
                        value={userRegister.username}
                        onChange={handleChange}
                  />
                </div>
                <div className="mb-4 text-lg">
                  <input
                        type="email"
                        name="email"
                        className="rounded-3xl border-none bg-gray-400 bg-opacity-50 px-6 py-2 text-center text-inherit placeholder-slate-200 shadow-lg outline-none backdrop-blur-md"
                        placeholder="email"
                        value={userRegister.email}
                        onChange={handleChange}
                  />
                </div>
                <div className="mb-4 text-lg">
                  <input
                        type="text"
                        name="password"
                        className="rounded-3xl border-none bg-gray-400 bg-opacity-50 px-6 py-2 text-center text-inherit placeholder-slate-200 shadow-lg outline-none backdrop-blur-md"
                        placeholder="password"
                        value={userRegister.password}
                        onChange={handleChange}
                  />
                </div>
                <div className="mt-8 flex justify-center text-lg text-black">
                  <button type="submit" className="rounded-3xl bg-gray-400 bg-opacity-50 px-10 py-2 text-black shadow-xl backdrop-blur-md transition-colors duration-300 hover:bg-yellow-600">Register</button>
                </div>
              </form>
            </div>
          </div>
        </div>
    )
}

export default RegisterPage;