import React from "react";
import { AiOutlineUserDelete, AiOutlineUserAdd } from "react-icons/ai";
import { UserBlockUnblock_URL } from "../Utils/Constance";
import useAdmin from "../Hooks/useAdmin";

const BlockUnblock = ({ userdata, isModal,isopen }) => {

  const {UserManagement} = useAdmin()
 
  if (!isopen) return null;
  const handleConfirm =()=>{

    UserManagement(UserBlockUnblock_URL,10)
    isModal(null)
  }
  console.log(userdata,'userdata')
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white rounded-lg shadow-lg p-6 w-1/3">
        {/* Icon */}
        <div className="flex justify-center mb-4">
          {userdata.is_active ? (
            <AiOutlineUserDelete className="text-red-500 text-4xl" />
          ) : (
            <AiOutlineUserAdd className="text-green-500 text-4xl" />
          )}
        </div>
        {/* Title */}
        <h2 className="text-xl font-bold text-center mb-4">
          {userdata.is_active ? "Block User" : "Unblock User"}
        </h2>
        {/* Description */}
        <p className="text-center text-gray-600 mb-6">
          Are you sure you want to{" "}
          <strong>{userdata.is_active ? "block" : "unblock"} {userdata.username} </strong> ? This
          action cannot be undone.
        </p>
        {/* Buttons */}
        <div className="flex justify-center gap-4">
          <button
            onClick={()=>isModal(null)}
            className="px-4 py-2 bg-gray-300 text-gray-800 rounded hover:bg-gray-400"
          >
            Cancel
          </button>
          <button
            onClick={handleConfirm}
            className={`px-4 py-2 rounded text-white ${
              userdata.is_active ? "bg-red-500 hover:bg-red-600" : "bg-green-500 hover:bg-green-600"
            }`}
          >
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
};

export default BlockUnblock;
