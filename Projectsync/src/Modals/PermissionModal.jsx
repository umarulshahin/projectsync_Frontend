import React from "react";
import { AiOutlineCheckCircle, AiOutlineCloseCircle } from "react-icons/ai";
import useAdmin from "../Hooks/useAdmin";
import { UserPermission_URl } from "../Utils/Constance";

const PermissionModal = ({  userdata, isModal, isOpen }) => {
  if (!isOpen) return null;
  
  const{UserManagement} = useAdmin()
  const handleConfirmPermission = () => {
    console.log("Permission updated",  userdata);
    UserManagement(UserPermission_URl,userdata.id)
    isModal(null)
  };

  

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white rounded-lg shadow-lg p-6 w-2/3 md:w-1/3">
        {/* Icon */}
        <div className="flex justify-center mb-4">
          { userdata.is_permission ? (
            <AiOutlineCloseCircle className="text-red-500 text-4xl" />
          ) : (
            <AiOutlineCheckCircle  className="text-green-500 text-4xl" />
          )}
        </div>
        {/* Title */}
        <h2 className="text-xl font-bold text-center mb-4">
          { userdata.is_permission ? "Remove Permission" : "Grant Permission"}
        </h2>
        {/* Description */}
        <p className="text-center text-gray-600 mb-6">
          Are you sure you want to{" "}
          <strong>{ userdata.is_permission ? "remove" : "grant"}</strong> permission
          to <strong>{userdata.username}</strong>? This action cannot be undone.
        </p>
        {/* Buttons */}
        <div className="flex justify-center gap-4">
          <button
            onClick={() => isModal(null)}
            className="px-4 py-2 bg-gray-300 text-gray-800 rounded hover:bg-gray-400"
          >
            Cancel
          </button>
          <button
            onClick={ handleConfirmPermission}
            className={`px-4 py-2 rounded text-white ${
               userdata.is_permission ? "bg-red-500 hover:bg-red-600" : "bg-green-500 hover:bg-green-600"
            }`}
          >
            { userdata.is_permission ? "Remove" : "Grant"} Permission
          </button>
        </div>
      </div>
    </div>
  );
};

export default PermissionModal;
