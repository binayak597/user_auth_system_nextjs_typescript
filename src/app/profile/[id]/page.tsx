"use client"

import React from 'react'

const ProfilePage = ({params}: any) => {

  return (
    <div className='flex flex-col items-center justify-center min-h-screen py-2'>

      <h1>Profile Page</h1>
      <hr />
      <p className='text-2xl py-2'>Profile page data<span className='ml-2 rounded-md bg-orange-500 text-black p-2'>{params.id}</span></p>
    </div>
  )
}

export default ProfilePage