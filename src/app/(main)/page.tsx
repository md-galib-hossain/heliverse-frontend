"use client"
import { useGetUsersQuery } from '@/redux/api/userApi'
import React from 'react'

const HomePage = () => {
  const {data:users,isLoading} = useGetUsersQuery(undefined)
  if(!isLoading){
    console.log(users)
  }
  return (
    <div className='max-w-screen-xl mx-auto bg-red-600 p-5'>
      Home page
      </div>
  )
}

export default HomePage