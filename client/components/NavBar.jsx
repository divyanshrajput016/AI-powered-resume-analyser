import React from 'react'
import Link from "next/link";


const NavBar = () => {
  return (

    <div className='h-16 flex justify-between bg-linear-to-r from-blue-500 to-purple-500 items-center px-18 bg-black border-b border-gray-800'>
      <div>
        <h1 className='text-3xl font-extrabold tracking-tight'>
          <span className="text-white italic">Resume Analyser</span>
        </h1>
      </div>
      <div className='flex gap-10 font-medium text-gray-300'>
        <Link href="/analyze" className="hover:text-white transition-colors bg-linear-to-r from-red-500 to-pink-500 text-white rounded-4xl px-4">Analyze</Link>
        <Link href="/" className="hover:text-white transition-colors">Home</Link>
        <Link href="/about" className="hover:text-white transition-colors">About</Link>
        <Link href="/login" className="hover:text-white transition-colors">Login</Link>
        <Link href="/signup" className="hover:text-white transition-colors">Signup</Link>
      </div>
    </div>
  )
}

export default NavBar
