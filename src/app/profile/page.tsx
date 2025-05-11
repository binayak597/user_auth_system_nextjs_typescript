"use client"

import React from 'react'
import axios from 'axios'
import { useRouter } from 'next/navigation'
import toast from 'react-hot-toast'

const ProfilePage = () => {

  const router = useRouter()

  const handleLogout = async () => {

    try {

      await axios.get("/api/user/logout")
      toast.success("logout successful")
      router.push("/login")
      
    } catch (error: any) {
      
      console.log(error.response.data.message)
      toast.error(error.response.data.message)
    }
  }
  return (
    <div className='flex flex-col items-center justify-center min-h-screen py-2'>
      <h1 className='text-2xl'>Profile</h1>
      <hr />

      <button onClick={handleLogout} className='mt-4 px-4 py-2 bg-blue-500 text-wite rounded'>
        Logout
      </button>
    </div>
  )
}

export default ProfilePage