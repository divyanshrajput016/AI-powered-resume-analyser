import React from 'react'
import Link from 'next/link'
import NavBar from '@/components/NavBar'

const page = () => {
  return (
    <div className='bg-black min-h-screen w-screen text-white'>
      <NavBar />

      <div className='flex mx-12 justify-around mt-4 text-gray-300'>
        <div className='w-2/5 h-150 flex flex-col py-28 gap-10'>
          <h1 className='text-5xl font-extrabold tracking-tight leading-tight text-white'>
            Welcome To <span className='text-white'>Resume Analyser</span>
          </h1>
          <Link href="/analyze" className='w-40 py-3 px-6 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg text-center text-white font-semibold hover:from-purple-600 hover:to-pink-600 transition duration-300'>Get Started</Link>
          <p className='text-lg font-normal leading-relaxed'>A Resume Analyzer that identifies skill gaps by comparing resumes with job requirements and generates personalized, interview-ready questions to help users prepare effectively and improve employability.</p>
        </div>

        <div className='w-2/5 '>
          <div className='w-full h-100 overflow-hidden rounded-3xl mt-20' >
          <img className='w-full h-auto  shadow-2xl shadow-white/10 border border-gray-800' src="https://i.pinimg.com/736x/26/18/cd/2618cd7ed2d3976b6676bf2cbc92dc55.jpg" alt="" />
          </div>
        </div>
      </div>

    </div>
  )
}

export default page
