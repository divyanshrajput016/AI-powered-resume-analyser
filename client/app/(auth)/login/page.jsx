"use client";
import React from 'react'
import NavBar from '@/components/NavBar.jsx'
import Link from 'next/link'
import { useAuth } from '@/hooks/useAuth.js'
import { useState } from 'react'
import { useRouter } from "next/navigation";

const page = () => {
  const {loading, handleLogin} = useAuth();
  const navigate = useRouter();

  const [identifier, setIdentifier] = useState('')
  const [password, setPassword] = useState('')

  function handleSubmit(e){
    e.preventDefault();
    handleLogin({ identifier, password });
    navigate.push("/analyze");
  }
  return (
    <div>
      <NavBar/>
      <div className='flex justify-center mt-12'>
        <div className='h-130 w-120 rounded-2xl bg-linear-to-b from-blue-300 to-white border-2 px-4 py-4 text-black'>
          <h1 className='text-3xl w-full flex justify-center py-2 font-serif'>LOGIN</h1>

          <form onSubmit={handleSubmit} className='flex flex-col gap-6 my-8'>
            <div>
              <label className='text-xl' htmlFor="identifier"><h1>Email or Username:</h1></label>
              <input name="identifier" type="text" id='identifier' placeholder='Enter email Or Username' onChange={(e) => {setIdentifier(e.target.value)}} className='border-gray-500 border-2 rounded-3xl w-full px-2 py-2'/>
            </div>

            <div>
              <label className='text-xl' htmlFor="password"><h1>Password:</h1></label>
              <input name="password" type="password" id='password' placeholder='Enter Your Password ' onChange={(e) => {setPassword(e.target.value)}} className='border-gray-500 border-2 rounded-3xl w-full px-2 py-2' />
            </div>
            
            <button className='w-60 px-4 py-2 bg-linear-to-r from-blue-500 to-purple-500 text-white rounded-4xl ml-25 cursor-pointer' disabled={loading}>
              {loading ? 'Logging in...' : 'Submit'}
            </button>
          </form>

          <p className='w-full flex justify-center '> Dont have an account ? <Link href="/signup" className='text-purple-500 ml-2'>signup</Link></p>
          
        </div>
      </div>
    </div>
  )
}

export default page
