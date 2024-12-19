import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import useAdmin from "../Hooks/useAdmin";
import ModalManager from "../Modals/ModalManager";

const User = () => {
  const [activeTab, setActiveTab] = useState("all");
  const [isDropdownOpen,setIsDropdownOpen] = useState(null)
  const [Modal , setModal] = useState(null)
  const [UpdateUser, setUpdateUser] = useState(null)
  const [UserList , setUserList] = useState(null)
  const Users = useSelector((state) => state.admindata.user_list);

  const { GetUser } = useAdmin();

  useEffect(()=>{
    
    const filterUsers = Users.filter((user)=>{
        switch (activeTab){
            case "all":
                return true
            case "Active":
                return user.is_active === true
            case "Blocked":
                return user.is_active === false
            default: 
              return false
        }
    })
    setUserList(filterUsers)

     
  },[Users,activeTab])

  useEffect(() => {
    // Getting the User list api Call
    GetUser();
  }, []);

  const handlePermissionChange = (data)=>{
  
    setUpdateUser(data)
    setModal('permission')
  }

  const handleBlockUnblock = (data)=>{
  
    setUpdateUser(data)
    setModal('blockunblock')
  }

  return (
    <div className="p-4 md:p-10 bg-orange-200/80 min-h-screen">
      <div className="flex flex-col">
        <h1 className="text-2xl md:text-3xl text-black font-bold mb-5">
          User Management
        </h1>
        <div className="p-4 md:p-6 rounded-lg shadow-lg bg-white">
          {/* Tabs */}
          <div className="bg-white w-full md:w-1/4 flex justify-evenly rounded-md my-4 border-2 border-orange-200/80 shadow-2xl">
            <button
              className={`flex-grow py-2 ${
                activeTab !== "all" && "hover:bg-gray-300 hover:text-black"
              } font-semibold transition-colors duration-500 pr-2 ${
                activeTab === "all" ? "bg-black text-orange-400" : "bg-transparent"
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
                  ? "bg-black text-orange-400"
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
                  ? "bg-black text-orange-400"
                  : "bg-transparent"
              }`}
              onClick={() => setActiveTab("Blocked")}
            >
              Blocked
            </button>
          </div>

          <div>
            <table className="min-w-full bg-white rounded-lg">
              <thead>
                <tr className="bg-gray-200">
                  <th className="py-3 px-4 text-left text-gray-600 font-semibold">
                    ID
                  </th>
                  <th className="py-3 px-4 text-left text-gray-600 font-semibold">
                    Name
                  </th>
                  <th className="py-3 px-4 text-left text-gray-600 font-semibold">
                    Email
                  </th>
                  <th className="py-3 px-4 text-left text-gray-600 font-semibold">
                    Join Date
                  </th>
                  <th className="py-3 px-4 text-left text-gray-600 font-semibold">
                    Permission
                  </th>
                  <th className="py-3 px-4 text-left text-gray-600 font-semibold">
                    Status
                  </th>
                  <th className="py-3 px-4 text-left text-gray-600 font-semibold">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody>
                {UserList ? (
                  UserList.map((data, index) => (
                    <tr
                      key={data.id}
                      className="relative hover:bg-gray-200 font-semibold transition-colors"
                    >
                      <td className="py-3 px-4">{index + 1}</td>

                      <td className="py-3 px-4">{data.username}</td>
                      <td className="py-3 px-4">{data.email}</td>
                      <td className="py-3 px-4">
                        {new Date(data.date_joined).toLocaleDateString()}
                      </td>
                      <td
                        className={`py-3 px-4 ${
                          data.is_permission ? "text-green-600" : "text-red-600"
                        }`}
                      >
                        {data.is_permission ? "Allowed" : "Not Allowed"}
                      </td>

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
                            className="inline-flex w-full justify-center rounded-md border border-orange-200/80 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm ring-1 ring-gray-300 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                            onClick={()=>setIsDropdownOpen(isDropdownOpen === data.id ? null : data.id)}
                          >
                            Options
                          </button>

                          {isDropdownOpen=== data.id && (
                            <div className="absolute right-0 z-10 mt-2 w-48 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                              <ul className="py-1">
                                {/* Block/Unblock Option */}
                                <li>
                                  <button
                                    className="block w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-200"
                                    onClick={() => {
                                      handleBlockUnblock(data);
                                      setIsDropdownOpen(null);
                                    }}
                                  >
                                    {data.is_active ? "Block" : "Unblock"}
                                  </button>
                                </li>
                                {/* Permission Option */}
                                <li>
                                  <button
                                    className="block w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-200"
                                    onClick={() => {
                                      handlePermissionChange(data);
                                      setIsDropdownOpen(null);
                                    }}
                                  >
                                    {data.is_permission ? "Remove Permission" : " Allowed Permission"}
                                  </button>
                                </li>
                              </ul>
                            </div>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="7" className="py-6 px-4 text-center">
                      <div className="flex flex-col justify-center items-center">
                        <h1 className="text-lg md:text-2xl font-bold text-gray-600">
                          No users found!
                        </h1>
                      </div>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
            {Modal && <ModalManager
               modaltype = {Modal}
               userdata = {UpdateUser}
               isModal = {setModal}
             />}
          </div>
        </div>
      </div>
    </div>
  );
};

export default User;
