import React, { useState } from 'react';
import { doCreateUserWithEmailandPassword  } from '../Firebase/auth';
import { useAuth } from '../AuthContext';
import { Link, Navigate } from 'react-router-dom';

function LogSign() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [isRegistering, setIsRegistering] = useState(false);
    const { userLoggedIn } = useAuth();
    const [error, setError] = useState('');

    const onSubmit = async (e) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            setError('Passwords do not match');
            return;
        }
        setError('');
        if (!isRegistering) {
            setIsRegistering(true);
            try {
                await doCreateUserWithEmailandPassword(email, password, name);

            } catch (err) {
                setError('Failed to create an account. Please try again.');
                setIsRegistering(false);
            }
        }
    };

    if (userLoggedIn) {
        return <Navigate to="/" replace={true} />;
    }

    return (
        <div className='flex flex-col justify-between items-center p-4 mt-14'>
            <div className='text-center font-poppins'>
                <h1 className='text-4xl font-bold'>Sign Up</h1>
            </div>
            <form className='flex flex-col space-y-4 mt-4' onSubmit={onSubmit}>
                <input
                    type='text'
                    placeholder='Full Name'
                    className='p-2 border border-gray-300 rounded-[10px] w-[400px]'
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
                <input
                    type='email'
                    placeholder='Email address'
                    className='p-2 border border-gray-300 rounded-[10px] w-[400px]'
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <input
                    type='password'
                    placeholder='Enter password'
                    className='p-2 border border-gray-300 rounded-[10px] w-[400px]'
                    autoComplete='new-password'
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <input
                    type='password'
                    placeholder='Re-Enter password'
                    className='p-2 border border-gray-300 rounded-[10px] w-[400px]'
                    autoComplete='off'
                    required
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                />
                <button type='submit' className={`bg-black text-white rounded-[10px] h-[40px] ${isRegistering ? 'cursor-not-allowed' : ''}`} disabled={isRegistering}>
                    Sign Up
                </button>
            </form>
            {error && <div className="text-red-500 mt-4">{error}</div>}
            <div className='flex flex-row mt-4'>
                <p>Already have an account?</p>
                <p className='cursor-pointer underline ml-2'>
                    <Link to='/login'>Sign In</Link>
                </p>
            </div>
        </div>
    );
}

export default LogSign;
