"use client";
import React from 'react'
import NavBar from '@/components/NavBar.jsx'
import { useRouter } from 'next/navigation'
import { useAuth } from '../../../hooks/useAuth'


const page = () => {
  const { user } = useAuth()
  const router = useRouter()

  if (!user) {
    return <div>Please log in to access this page. <button className='bg-white py-2 px-4 text-black rounded-3xl hover:scale-90' onClick={() => router.push('/login')}>Go to Login</button></div>
  }

  return (
    <div>
      <NavBar />
      <h1>Analysis Page</h1>
      <p>Welcome, {user.name}!</p>
    </div>
  )
}

export default page
