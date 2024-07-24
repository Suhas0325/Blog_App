import React, { useState } from 'react';
import { Link, Navigate } from 'react-router-dom';
import { doSignwithEmailandPassword } from '../Firebase/auth';
import { useAuth } from '../AuthContext';

function Login() {
    const { userLoggedIn } = useAuth();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isSignIn, setIsSignIn] = useState(false);
    const [error, setError] = useState('');

    const onSubmit = async (e) => {
        e.preventDefault();
        if (!isSignIn) {
            setIsSignIn(true);
            try {
                await doSignwithEmailandPassword(email, password);
            } catch (err) {
                setError('Failed to sign in. Please check your credentials.');
                setIsSignIn(false);
            }
        }
    };

    if (userLoggedIn) {
        return <Navigate to="/" replace={true} />;
    }

    return (
        <div className="flex flex-col justify-between items-center p-4 mt-14">
            <div className="text-center font-poppins">
                <h1 className="text-4xl font-bold">Sign In</h1>
            </div>
            <form className="flex flex-col space-y-4 mt-4" onSubmit={onSubmit}>
                <input
                    type="email"
                    placeholder="Email address"
                    className="p-2 border border-gray-300 rounded-[10px] w-[400px]"
                    autoComplete="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <input
                    type="password"
                    placeholder="Enter password"
                    className="p-2 border border-gray-300 rounded-[10px] w-[400px]"
                    autoComplete="current-password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <button type="submit" className="bg-black text-white rounded-[10px] h-[40px]">
                    Sign In
                </button>
            </form>
            {error && <div className="text-red-500 mt-4">{error}</div>}
            <div className="flex flex-row mt-4">
                <p>Don't have an account?</p>
                <p className="cursor-pointer underline ml-2">
                    <Link to="/signup">Sign Up</Link>
                </p>
            </div>
        </div>
    );
}

export default Login;
