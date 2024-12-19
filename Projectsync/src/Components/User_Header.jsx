import React, { useState } from "react";
import projectsync from "../assets/projectsync.png";
import profile from "../assets/profile_img.png";
import { useDispatch, useSelector } from "react-redux";
import { LogoutIcon } from "@heroicons/react/outline";
import Cookies from 'js-cookie'
import { Link, useNavigate } from "react-router-dom";
import { addLogout, addUserdata } from "../Redux/UserSlice";

const User_Header= () => {

  const [toggel, settoggel] = useState(false);
  const user = useSelector((state) => state.userdata.userdata);
  const { username } = user;
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const handleLogout = () => {

    Cookies.remove('userToken')
    dispatch(addLogout(null))
    navigate('/')

  };

  return (
    <div className="fixed flex  justify-between p-6 bg-gradient-to-l  bg-black shadow-xl h-20 w-full">
      <div className="flex items-center gap-8  ">
       <Link to='/userhome'><img src={projectsync} className="h-20" alt="logo" /></Link> 
      </div>
      <div
        className="flex items-center gap-2 pr-6 md:pr-10 cursor-pointer "
        onClick={() => settoggel(!toggel)}
      >
        <img src={profile} alt="" className="h-10 w-10 rounded-full" />
        <span className="text-lg font-semibold text-white">{username}</span>
      </div>
      {toggel && (
        <div
          onClick={handleLogout}
          className="right-0 shadow-xl absolute mt-14 z-10 cursor-pointer"
        >
          <ul className="flex ">
            {" "}
            <li className="bg-white text-left hover:bg-red-500 hover:text-white pr-12 pl-2 py-2 rounded-sm flex items-end  text-black font-semibold space-x-2">
              <LogoutIcon className="w-5 h-5" />
              <span>Logout</span>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default User_Header;
