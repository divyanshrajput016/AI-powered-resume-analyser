"use client";
import React from 'react'
import NavBar from '@/components/NavBar.jsx'
import Link from 'next/link'
import { useAuth } from '../../../hooks/useAuth'
import { useState } from 'react'
import { useRouter } from 'next/navigation'

const page = () => {

  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const {loading, handleRegister} = useAuth();

  const navigate = useRouter();


  function handleSubmit(e) {
    e.preventDefault();
    handleRegister({username , email , password})
    navigate.push("/login");
  }

  return (
    <div>
      <NavBar/>
      <div className='flex justify-center mt-12'>
        <div className='h-130 w-120 rounded-2xl bg-linear-to-b from-blue-300 to-white border-2 px-4 py-4 text-black'>
          <h1 className='text-3xl w-full flex justify-center py-2 font-serif'>SIGN UP</h1>

          <form onSubmit={handleSubmit}  className='flex flex-col gap-6 my-8'>
            <div>
              <label className='text-xl' htmlFor="username"><h1>Username:</h1></label>
              <input onChange={(e) => setUsername(e.target.value)} name="username" type="username" id='username' placeholder='Enter your username' className='border-gray-500 border-2 rounded-3xl w-full px-2 py-2'/>
            </div>

            <div>
              <label className='text-xl' htmlFor="email"><h1>Email:</h1></label>
              <input onChange={(e) => setEmail(e.target.value)} name="email" type="email" id='email' placeholder='Enter email address' className='border-gray-500 border-2 rounded-3xl w-full px-2 py-2'/>
            </div>

            <div>
              <label className='text-xl' htmlFor="password"><h1>Password:</h1></label>
              <input onChange={(e) => setPassword(e.target.value)} name="password" type="password" id='password' placeholder='Enter Your Password ' className='border-gray-500 border-2 rounded-3xl w-full px-2 py-2' />
            </div>

            <button className='w-60 px-4 py-2 bg-linear-to-r from-blue-500 to-purple-500 text-white rounded-4xl ml-25 cursor-pointer'>Submit</button>
          </form>

          <p className='w-full flex justify-center '> Already  have an account ? <Link href="/login" className='text-purple-500 ml-2'>login</Link></p>
          
        </div>
      </div>
    </div>
  )
}

export default page
