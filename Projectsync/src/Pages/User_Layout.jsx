import React from 'react'
import User_Header from '../Components/User_Header'
import { Outlet } from 'react-router-dom'

const User_Layout = () => {
  return (
    <div className='min-h-screen' >
      <User_Header />
    <main className=' pt-20 bg-stone-300'>
      <Outlet />
    </main>
    </div>
  )
}
export default User_Layout