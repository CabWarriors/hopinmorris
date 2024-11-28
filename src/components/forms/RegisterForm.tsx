"use client"
import Link from 'next/link'
import { useRouter } from 'next/navigation';
import React, { useState } from 'react'

const RegisterForm = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const router = useRouter()

    async function handleSubmit(e: React.FormEvent){
        e.preventDefault();

        if (!name || !email || !password) {
            setError('All fields are necessary.');
            return;
        }
        
        try {
            const res = await fetch('/api/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ name, email, password })
            })

            if (res.ok) {
                setName('');
                setEmail('');
                setPassword('');
                router.push('/')
            } else {
                const responseBody = await res.json();
                setError(responseBody.message || 'An error occurred');
                setName('');
                setEmail('');
                setPassword('');
            }
        } catch (error) {
            console.log("Error during the registration: ", error)
            setError('An unexpected error occurred.');
        }
    }

    return (
        <div className='grid place-items-center h-screen'>
            <div className='p-5 rounded-xl border border-slate-600 shadow-md shadow-cyan-50'>
                <h1 className='text-2xl text-center font-bold my-4'>Register</h1>
                <form className='flex flex-col gap-3' onSubmit={handleSubmit}>
                    <input type="text" placeholder='Full Name' value={name}
                        className='w-80 bg-gray-200 h-10 placeholder:uppercase rounded-lg 
                        placeholder:text-gray-400 placeholder:px-2 my-1'
                        onChange={(e) => setName(e.target.value)} />
                    <input type="email" placeholder='Email' value={email}
                        className='w-80 bg-gray-200 h-10 placeholder:uppercase rounded-lg 
                        placeholder:text-gray-400 placeholder:px-2 my-1'
                        onChange={(e) => setEmail(e.target.value)} />
                    <input type="password" placeholder='Password' value={password}
                        className='w-80 bg-gray-200 h-10 placeholder:uppercase rounded-lg 
                        placeholder:text-gray-400 placeholder:px-2 my-1'
                        onChange={(e) => setPassword(e.target.value)} />
                    <button className='text-slate-700 p-2 uppercase border border-slate-600 mt-1 rounded-xl 
                        w-full bg-gray-100' type='submit'>Register</button>
                    {error && (
                        <div className='bg-red-500 text-white w-fit text-sm py-1 px-3 
                            rounded-lg mt-2'>
                            {error}
                        </div>
                    )}
                    <Link href={'/'} className='text-sm mt-3 text-cyan-600 text-right'>
                        Already have an account <span className='underline ml-2 uppercase text-cyan-400 underline-offset-4'>Login</span>
                    </Link>
                </form>
            </div>
        </div>
    )
}

export default RegisterForm;
