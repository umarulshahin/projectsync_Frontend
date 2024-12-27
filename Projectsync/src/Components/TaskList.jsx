import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import useBase from '../Hooks/useBase';
import { Menu, Transition } from '@headlessui/react';
import { ChevronDownIcon } from '@heroicons/react/20/solid';

const TaskList = ({ project_id }) => {
  const Tasks = useSelector((state) => state.userdata.tasks);
  const { Get_Tasks } = useBase();

  useEffect(() => {
    if (project_id) {
      Get_Tasks(null, project_id);
    }
  }, [project_id]);

  const handleAction = (taskId, action) => {
    console.log(`Action: ${action} for Task ID: ${taskId}`);
    // Implement action logic (view/edit/delete)
  };

  return (
    <div className="container mx-auto py-6">
      <h1 className="text-2xl font-semibold mb-6">Project Tasks</h1>
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
                        <Menu.Button className="inline-flex justify-center w-full rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-100">
                          Actions
                          <ChevronDownIcon className="ml-2 -mr-1 h-5 w-5 text-gray-400" aria-hidden="true" />
                        </Menu.Button>
                      </div>

                      <Transition
                        as={React.Fragment}
                        enter="transition ease-out duration-100"
                        enterFrom="transform opacity-0 scale-95"
                        enterTo="transform opacity-100 scale-100"
                        leave="transition ease-in duration-75"
                        leaveFrom="transform opacity-100 scale-100"
                        leaveTo="transform opacity-0 scale-95"
                      >
                        <Menu.Items className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                          <div className="py-1">
                            <Menu.Item>
                              {({ active }) => (
                                <button
                                  onClick={() => handleAction(task.id, 'View')}
                                  className={`${
                                    active ? 'bg-gray-100 text-gray-900' : 'text-gray-700'
                                  } block px-4 py-2 text-sm`}
                                >
                                  View
                                </button>
                              )}
                            </Menu.Item>
                            <Menu.Item>
                              {({ active }) => (
                                <button
                                  onClick={() => handleAction(task.id, 'Edit')}
                                  className={`${
                                    active ? 'bg-gray-100 text-gray-900' : 'text-gray-700'
                                  } block px-4 py-2 text-sm`}
                                >
                                  Edit
                                </button>
                              )}
                            </Menu.Item>
                            <Menu.Item>
                              {({ active }) => (
                                <button
                                  onClick={() => handleAction(task.id, 'Delete')}
                                  className={`${
                                    active ? 'bg-gray-100 text-gray-900' : 'text-gray-700'
                                  } block px-4 py-2 text-sm`}
                                >
                                  Delete
                                </button>
                              )}
                            </Menu.Item>
                          </div>
                        </Menu.Items>
                      </Transition>
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
    </div>
  );
};

export default TaskList;
