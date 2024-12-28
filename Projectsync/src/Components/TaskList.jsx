import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import useBase from '../Hooks/useBase';
import { Menu, Transition } from '@headlessui/react';
import { ChevronDownIcon } from '@heroicons/react/20/solid';
import ModalManager from '../Modals/ModalManager';

const TaskList = ({ project_id }) => {
  const tasks = useSelector((state) => state.userdata.tasks);
  const { Get_Tasks } = useBase();
  const [activeTab, setActiveTab] = useState("all");
  const [Tasks, setTasks] = useState(null)
  const [Taskdata , setTaskdata] = useState(null)
  const [isModal , setisModal] = useState(null)

  useEffect(() => {
    if (project_id) {
      Get_Tasks(null, project_id);
    }
  }, [project_id]);
  
  useEffect(()=>{
   
    const values = tasks && tasks.filter((task)=>{
        switch (activeTab){
            case "all":
                return true

            case "To-Do":
                return task.status === 'To-Do'

            case "In-Progress":
                return task.status === 'In-Progress'

            case "Done":
                return task.status === 'Done'
            default:
                return false
          }
    })
    setTasks(values)

  },[tasks,activeTab])
 

  const handleAction = (taskId, action) => {
    console.log(`Action: ${action} for Task ID: ${taskId}`);
    
    setisModal(action)
    setTaskdata(taskId)
  };



  return (
    <div className="container mx-auto py-6 ">
        <div className='flex justify-between '>

      <h1 className="text-2xl font-semibold my-4">Project Tasks</h1>

      <div className="bg-white w-full md:w-2/6 flex justify-evenly rounded-md my-4 border-2 border-stone-400 shadow-2xl">
         <button
              className={`flex-grow py-2 ${
                activeTab !== "all" && "hover:bg-gray-300 hover:text-black"
              } font-semibold transition-colors duration-500 pr-2 ${
                activeTab === "all"? "bg-black text-white" : "bg-transparent"
              }`}
              onClick={() => setActiveTab("all")}
            >
              All
            </button>
            <button
              className={`flex-grow py-2 ${
                activeTab !== "To-Do" && "hover:bg-gray-300 hover:text-black"
              } font-semibold transition-colors duration-500 pr-2 ${
                activeTab === "To-Do"? "bg-black text-white" : "bg-transparent"
              }`}
              onClick={() => setActiveTab("To-Do")}
            >
              To-Do
            </button>
            <button
              className={`flex-grow py-2 font-semibold ${
                activeTab !== 'In-Progress' && "hover:bg-gray-300 hover:text-black"
              } transition-colors duration-500 pr-2 ${
                activeTab === 'In-Progress'
                  ? "bg-black text-white"
                  : "bg-transparent"
              }`}
              onClick={() => setActiveTab('In-Progress')}
            >
              In-Progress
            </button>
            <button
              className={`flex-grow py-2 font-semibold ${
                activeTab !== 'Done' && "hover:bg-gray-300 hover:text-black"
              } transition-colors duration-500 pr-2 ${
                activeTab === 'Done'
                  ? "bg-black text-white"
                  : "bg-transparent"
              }`}
              onClick={() => setActiveTab('Done')}
            >
              Done
            </button>
          </div>
          </div>

      <div className="overflow-x-auto shadow-md border border-gray-200 rounded-lg">
        <table className="min-w-full bg-white">
          <thead>
            <tr>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-500 border-b">Title</th>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-500 border-b max-w-[200px]">Description</th>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-500 border-b">Created Date</th>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-500 border-b">Created By</th>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-500 border-b">Assigned To</th>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-500 border-b">Status</th>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-500 border-b">Priority</th>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-500 border-b">Action</th>
            </tr>
          </thead>
          <tbody>
            {Tasks && Tasks.length > 0 ? (
              Tasks.map((task) => (
                <tr key={task.id} className="hover:bg-stone-100">
                  <td className="px-6 py-4 text-sm font-medium text-gray-900 border-b">{task.title}</td>
                  <td className="px-6 py-4 text-sm text-gray-700 border-b max-w-[200px]">{task.description}</td>
                  <td className="px-6 py-4 text-sm text-gray-500 border-b">{task.created_at}</td>
                  <td className="px-6 py-4 text-sm text-gray-500 border-b">{task.created_by.username}</td>
                  <td className="px-6 py-4 text-sm text-gray-500 border-b">{task.assigned_to.username}</td>
                  <td className="px-6 py-1 text-sm text-gray-500 border-b">
                    <span className={`px-3 py-1 rounded-full text-sm ${task.status === 'To-Do' ? 'bg-blue-100 text-blue-500' : task.status === 'In-Progress' ? 'bg-orange-100 text-orange-500' : 'bg-green-100 text-green-500'}`}>
                      {task.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-500 border-b">{task.priority}</td>
                  <td className="px-6 py-4 text-sm text-gray-500 border-b">
                    <Menu as="div" className="relative inline-block text-left">
                      <div>
                        <Menu.Button className="inline-flex justify-center w-full rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-stone-300 focus:ring-offset-2 focus:ring-offset-gray-100">
                          Actions
                          <ChevronDownIcon className="ml-2 -mr-1 h-5 w-5 text-gray-400" aria-hidden="true" />
                        </Menu.Button>
                      </div>

                        <Menu.Items className="absolute  right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                          <div className="py-1 ">
                            <Menu.Item>
                              {({ active }) => (
                                <button
                                  onClick={() => handleAction({id:task.id,name:task.title}, 'Task_View')}
                                  className={`${
                                    active ? 'bg-stone-300 text-gray-900' : 'text-gray-700'
                                  } block px-4 py-2 text-sm  w-full `}
                                >
                                  View
                                </button>
                              )}
                            </Menu.Item>
                            <Menu.Item>
                              {({ active }) => (
                                <button
                                  onClick={() => handleAction({id:task.id,name:task.title}, 'Task_Edit')}
                                  className={`${
                                    active ? 'bg-stone-300 text-gray-900' : 'text-gray-700'
                                  } block px-4 py-2 text-sm  w-full`}
                                >
                                  Edit
                                </button>
                              )}
                            </Menu.Item>
                            <Menu.Item>
                              {({ active }) => (
                                <button
                                  onClick={() => handleAction({id:task.id,name:task.title}, 'Task_Delete')}
                                  className={`${
                                    active ? 'bg-stone-300 text-gray-900' : 'text-red-500'
                                  } block px-4 py-2 text-sm  w-full`}
                                >
                                  Delete
                                </button>
                              )}
                            </Menu.Item>
                          </div>
                        </Menu.Items>
                    </Menu>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="8" className="py-4 text-center text-gray-500 font-semibold">No Task Available</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <ModalManager userdata={Taskdata} modaltype={isModal} isModal={setisModal} />
    </div>
  );
};

export default TaskList;
