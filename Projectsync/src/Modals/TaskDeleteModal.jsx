import React from 'react'
import { XMarkIcon,TrashIcon  } from '@heroicons/react/24/outline';
import useBase from '../Hooks/useBase';

const TaskDeleteModal = ({Taskdata, isModal, isOpen }) => {

    if (!isOpen) return null;

    const {Delete_Task} = useBase()

    const handleConfirm = () => {
      
        console.log(Taskdata.id)
        Delete_Task(null,Taskdata.id)
        isModal(false);
    };
  
   
    return (
      <div className="fixed inset-0 z-50 overflow-y-auto">
        {/* Backdrop */}
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 transition-opacity"
          onClick={() => isModal(null)}
        />
  
        {/* Modal */}
        <div className="flex min-h-screen items-center justify-center p-4">
          <div className="relative w-full max-w-md transform rounded-lg bg-white p-6 shadow-xl transition-all">
            {/* Close button */}
            <button
              onClick={() => isModal(null)}
              className="absolute right-4 top-4 text-gray-400 hover:text-gray-500"
            >
              <XMarkIcon className="h-5 w-5" />
            </button>
  
            <div className="flex items-center justify-center mb-6">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-red-100">
                <TrashIcon  className="h-6 w-6 text-red-600" />
              </div>
            </div>
  
            <div className="text-center">
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                Delete Task
              </h3>
              <p className="text-sm text-gray-500 mb-6">
                Are you sure you want to Delete <span className="font-medium text-gray-900">{Taskdata?.name}</span> from this project?
                This action cannot be undone.
              </p>
            </div>
  
            <div className="flex justify-center gap-3">
              <button
                onClick={()=> isModal(null)}
                className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                onClick={()=>handleConfirm()}
                className="px-4 py-2 text-sm font-medium text-white bg-red-600 rounded-md hover:bg-red-700"
              >
                Delete Task
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  };

export default TaskDeleteModal