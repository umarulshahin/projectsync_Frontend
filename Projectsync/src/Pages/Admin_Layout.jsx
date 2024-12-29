import React from 'react'
import Admin_Header from '../Components/Admin_Header'
import Sidebar from '../Components/Sidebar'
import { Outlet } from 'react-router-dom'
const Admin_Layout = () => {
  return (
    <div className="flex min-h-screen bg-gray-50 md:overflow-hidden">
      {/* Sidebar */}
      <div className="fixed left-0 h-full z-30">
        <Sidebar />
      </div>

      <div className="flex-1 flex flex-col ml-16 md:ml-48">
        {/* Header */}
        <Admin_Header />
        
        {/* Main Content Area */}
        <main className="flex-1  mt-20 ">
          <Outlet /> 
        </main>
      </div>
    </div>
  );
};
export default Admin_Layout;