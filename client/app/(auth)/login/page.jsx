import React from 'react'
import NavBar from '@/components/NavBar.jsx'
import Link from 'next/link'

const page = () => {
  return (
    <div>
      <NavBar/>
      <div className='flex justify-center mt-12'>
        <div className='h-130 w-120 rounded-2xl bg-linear-to-b from-blue-300 to-white border-2 px-4 py-4 text-black'>
          <h1 className='text-3xl w-full flex justify-center py-2 font-bold'>Login</h1>

          <form action="" className='flex flex-col gap-6 my-14'>
            <div>
              <label htmlFor="email"><h1>Email or Username:</h1></label>
              <input type="email" id='email' placeholder='Enter email Or Username' className='border-gray-500 border-2 rounded-3xl w-full px-2 py-2'/>
            </div>

            <div>
              <label htmlFor="password"><h1>Password:</h1></label>
              <input type="password" id='password' placeholder='Enter Your Password ' className='border-gray-500 border-2 rounded-3xl w-full px-2 py-2' />
            </div>
            
            <button className='w-60 px-4 py-2 bg-linear-to-r from-blue-500 to-purple-500 text-white rounded-4xl my-8 ml-25 cursor-pointer'>Submit</button>
          </form>

          <p className='w-full flex justify-center '> Dont have an account ? <Link href="/signup" className='text-blue-500'>signup</Link></p>
          
        </div>
      </div>
    </div>
  )
}

export default page
