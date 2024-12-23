import React from "react";
import useUser from "../Hooks/useUser";
import { ProjctStatus_URL } from "../Utils/Constance";

const ProjectStatusModal = ({ projectdata, isModal, isOpen }) => {
  if (!isOpen) return null;

  const {UpdateProject}=useUser()



  const handleConfirm = () => {
    console.log("Project status changed", projectdata);
    UpdateProject(ProjctStatus_URL ,projectdata.id,'status')
    isModal(null)
  }
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded-lg shadow-lg w-96 p-6">
        {/* Modal Header */}
        <h2 className="text-lg font-bold mb-4 text-center text-gray-800">Change Project Status</h2>

        {/* Modal Content */}
        <p className="text-gray-600 font-semibold mb-4 text-center">
          Are you sure you want to change the status of 
          <span className="font-bold"> {projectdata. title} </span>
          from 
          <span className="font-bold text-blue-500"> {projectdata.status} </span> 
          to 
          <span className="font-bold text-green-500"> {projectdata.status === "planned" ? "active" : "Completed"} </span>?
        </p>

        {/* Actions */}
        <div className="flex justify-center space-x-4">
          <button
            className="px-4 py-2 bg-gray-200 rounded-lg font-semibold hover:bg-gray-300 text-gray-700"
            onClick={() => isModal(null)}
          >
            Cancel
          </button>
          <button
            className="px-4 py-2 bg-blue-500 font-semibold text-white rounded-lg hover:bg-blue-700"
            onClick={()=>handleConfirm()}
          >
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProjectStatusModal;
