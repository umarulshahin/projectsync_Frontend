import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import useAdmin from '../Hooks/useAdmin';

const User = () => {
    const [activeTab, setActiveTab] = useState("all");
    const [dropdownOpen, setDropdownOpen] = useState(null);
    const [data,setdata] = useState('all')
    const User_list = useSelector((state)=> state.admindata.user_list)
    console.log(User_list,'user data')
    const { GetUser } = useAdmin()
    const handleBlockUnblock = () => {
        console.log('yes working ');
    };
    
    useEffect(()=>{
       
        // Getting the User list api Call
       GetUser() 

    },[])

    const handleDropdownToggle = (id) => {
        setDropdownOpen(dropdownOpen === id ? null : id);
    };

    return (
        <div className="p-4 md:p-10 bg-orange-200/80 min-h-screen">
            <div className="flex flex-col">
                <h1 className="text-2xl md:text-3xl text-black font-bold mb-5">User Management</h1>
                <div className="p-4 md:p-6 rounded-lg shadow-lg bg-white">
                    {/* Tabs */}
                    <div className="bg-white w-full md:w-1/4 flex justify-evenly rounded-md my-4 border-2 shadow-2xl">
                        <button
                            className={`flex-grow py-2 ${
                                activeTab !== "all" && "hover:bg-gray-300 hover:text-black"
                            } font-semibold transition-colors duration-500 pr-2 ${
                                activeTab === "all" ? "bg-black text-white" : "bg-transparent"
                            }`}
                            onClick={() => setActiveTab("all")}
                        >
                            All
                        </button>
                        <button
                            className={`flex-grow py-2 font-semibold ${
                                activeTab !== "Active" && "hover:bg-gray-300 hover:text-black"
                            } transition-colors duration-500 pr-2 ${
                                activeTab === "Active"
                                    ? "bg-black text-white"
                                    : "bg-transparent"
                            }`}
                            onClick={() => setActiveTab("Active")}
                        >
                            Active
                        </button>
                        <button
                            className={`flex-grow py-2 font-semibold ${
                                activeTab !== "Blocked" && "hover:bg-gray-300 hover:text-black"
                            } transition-colors duration-500 pr-2 ${
                                activeTab === "Blocked"
                                    ? "bg-black text-white"
                                    : "bg-transparent"
                            }`}
                            onClick={() => setActiveTab("Blocked")}
                        >
                            Blocked
                        </button>
                    </div>

                    <div >
                        <table className="min-w-full bg-white rounded-lg">
                            <thead>
                                <tr className="bg-gray-200">
                                    <th className="py-3 px-4 text-left text-gray-600 font-semibold">ID</th>
                                    <th className="py-3 px-4 text-left text-gray-600 font-semibold">Profile</th>
                                    <th className="py-3 px-4 text-left text-gray-600 font-semibold">Name</th>
                                    <th className="py-3 px-4 text-left text-gray-600 font-semibold">Phone</th>
                                    <th className="py-3 px-4 text-left text-gray-600 font-semibold">Wallet</th>
                                    <th className="py-3 px-4 text-left text-gray-600 font-semibold">Status</th>
                                    <th className="py-3 px-4 text-left text-gray-600 font-semibold">Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {User_list ? User_list.map((data) => (
                                    <tr
                                        key={data.id}
                                        className="relative hover:bg-gray-200 font-bold transition-colors"
                                    >
                                        <td className="py-3 px-4">{data.id}</td>
                                        <td className="py-3 px-4">
                                            <img
                                                src={data.profile ? `${backendUrl}${data.profile}` : 'profile'}
                                                alt="Profile"
                                                className="h-10 w-10 rounded-full object-cover cursor-pointer"
                                            />
                                        </td>
                                        <td className="py-3 px-4">{data.username}</td>
                                        <td className="py-3 px-4">{data.phone }</td>
                                        <td className="py-3 px-4">₹{data.wallet}</td>
                                        <td className="py-3 px-4">
                                            <span
                                                className={
                                                    data.is_active ? "text-green-600" : "text-red-600"
                                                }
                                            >
                                                {data.is_active ? "Active" : "Blocked"}
                                            </span>
                                        </td>
                                        <td className="py-3 px-4">
                                            <div className="relative inline-block text-left">
                                                <button
                                                    type="button"
                                                    className="inline-flex w-full justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm ring-1 ring-gray-300 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                                                    onClick={() => handleBlockUnblock(data)}
                                                >
                                                    {data.is_active ? "Block" : "Unblock"}
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                 )): 
                                ( <tr>
                                    <td colSpan="7" className="py-6 px-4 text-center">
                                      <div className="flex flex-col justify-center items-center">
                                        <h1 className="text-lg md:text-2xl font-bold text-gray-600">
                                          No users found!
                                        </h1>
                                      </div>
                                    </td>
                                  </tr>)
                                 } 
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default User;