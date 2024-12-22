import React from "react";
import { TrashIcon } from "@heroicons/react/24/outline";
import useBase from "../Hooks/useBase";

const DeleteProject = ({ projectdata, isModal, isOpen,  }) => {
  if (!isOpen) return null;

  const {Delete_Project}=useBase()

  const handleConfirm=()=>{
    console.log("Project deleted", projectdata);
     Delete_Project(null,projectdata.id)
     isModal(null)
  }

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white rounded-lg shadow-lg p-6 w-80">
        {/* Icon and Header */}
        <div className="flex flex-col items-center">
          <TrashIcon className="h-12 w-12 text-red-500" />
          <h2 className="text-lg font-semibold text-gray-800 mt-4">
            Delete Project
          </h2>
          <p className="text-sm text-gray-600 text-center mt-2">
            Are you sure you want to delete the project{" "}
            <span className="font-bold">{projectdata?.projectName}</span>? This
            action cannot be undone.
          </p>
        </div>

        {/* Buttons */}
        <div className="mt-6 flex justify-center gap-4">
          <button
            onClick={() => isModal(null)}
            className="bg-gray-200 text-gray-700 px-4 py-2 rounded hover:bg-gray-300 transition"
          >
            Cancel
          </button>
          <button
            onClick={()=>handleConfirm()}
            className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition"
          >
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteProject;
