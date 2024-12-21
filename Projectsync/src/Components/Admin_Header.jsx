import React, { useState } from "react";
import projectsync from "../assets/projectsync.png";
import profile from "../assets/profile_img.png";
import { useDispatch, useSelector } from "react-redux";
import { ArrowRightOnRectangleIcon } from "@heroicons/react/24/outline";
import Cookies from 'js-cookie'
import { Link, useLocation, useNavigate } from "react-router-dom";
import { addAdmin_Logout } from "../Redux/AdminSlice";

const Admin_Header= () => {

  const [toggle, setToggle] = useState(false);
  const user = useSelector((state) => state.admindata.admindata);
  const { username } = user;
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    Cookies.remove('adminToken');
    dispatch(addAdmin_Logout(null));
    navigate('/');
  };

  return (
    <header className="fixed top-0 right-0 left-16 md:left-48 bg-orange-200/80 border-b border-gray-400">
      <div className="flex justify-between items-center h-20 px-6">
        {location.pathname === '/adminhome' && (<h1 className="text-2xl font-medium">Dashboard</h1>)}
        {location.pathname === '/adminhome/user' && (<h1 className="text-2xl font-medium">Users</h1>)}

        
        <div className="relative">
          <div
            className="flex items-center gap-2 cursor-pointer"
            onClick={() => setToggle(!toggle)} >
              
            <img src={profile} alt="profile" className="h-10 w-10 rounded-full" />
            <span className="text-lg font-semibold text-gray-900">{username}</span>
          </div>

          {toggle && (
            <div className="absolute right-0 mt-2 md:w-48 bg-white rounded-md shadow-lg z-50">
              <button
                onClick={handleLogout}
                className="w-full flex items-center gap-2 px-4 py-2 text-left hover:bg-red-500 hover:text-white rounded-md"
              >
                <ArrowRightOnRectangleIcon className="w-5 h-5" />
                <span className="font-semibold">Logout</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Admin_Header;
