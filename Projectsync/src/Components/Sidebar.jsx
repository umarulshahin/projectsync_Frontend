import React from 'react';
import { NavLink } from 'react-router-dom';
import logo from '../assets/projectsync.png';
import { UserGroupIcon, ViewColumnsIcon, HomeIcon } from "@heroicons/react/24/outline";


const Sidebar = () => {
  return (
    <div className='w-16 md:w-48 h-full bg-black flex flex-col'>
      <div className='flex justify-center pt-5'>
        <img className='h-16 w-auto' src={logo} alt="projectsync" />
      </div>
      
      <nav className="mt-8 w-full px-3 space-y-2">
      <NavLink
          to="/adminhome"
          end
          className={({ isActive }) => `
            w-full flex items-center gap-3 px-4 py-3 text-gray-300 hover:bg-white hover:text-orange-600 hover:rounded-full 
            ${isActive ? 'bg-white text-orange-600 rounded-full' : ''}
          `}
        >
          <HomeIcon className="w-6 h-6" />
          <span className="hidden md:block">Dashboard</span>
        </NavLink>

        <NavLink
          to="/adminhome/user"
          className={({ isActive }) => `
            w-full flex items-center gap-3 px-4 py-3 text-gray-300 hover:bg-white hover:text-orange-600 hover:rounded-full 
            ${isActive ? 'bg-white text-orange-600 rounded-full' : ''}
          `}
        >
          <UserGroupIcon className="w-6 h-6" />
          <span className="hidden md:block">Users</span>
        </NavLink>

        <NavLink
          to="/adminhome/project"
          className={({ isActive }) => `
            w-full flex items-center gap-3 px-4 py-3 text-gray-300 hover:bg-white hover:text-orange-600 hover:rounded-full
            ${isActive ? 'bg-white text-orange-600 rounded-full' : ''}
          `}
        >
          <ViewColumnsIcon className="w-6 h-6" />
          <span className="hidden md:block">Projects</span>
        </NavLink>
      </nav>
    </div>
  );
};

export default Sidebar;