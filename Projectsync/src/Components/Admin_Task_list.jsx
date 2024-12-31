import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import useBase from '../Hooks/useBase';
import { FaTrashAlt, FaCheck, FaPlay } from 'react-icons/fa';
import { Tooltip } from 'react-tooltip';
import { Menu } from '@headlessui/react';
import { ChevronDownIcon } from "@heroicons/react/20/solid";
import ModalManager from '../Modals/ModalManager';
import { PlayCircle, CheckCircle, Trash2 } from 'lucide-react';

const Admin_Task_list = ({ project_id }) => {
  const tasks = useSelector((state) => state.userdata.tasks);
  const { Get_Tasks, Bulk_Update_Tasks, Bulk_Delete_Tasks } = useBase();
  const [activeTab, setActiveTab] = useState("all");
  const [Tasks, setTasks] = useState(null);
  const [Taskdata, setTaskdata] = useState(null);
  const [isModal, setisModal] = useState(null);
  const [selectedTasks, setSelectedTasks] = useState([]);

  useEffect(() => {
    if (project_id) {
      Get_Tasks('admin', project_id);
    }
  }, [project_id]);

  useEffect(() => {
    const values =
      tasks &&
      tasks.filter((task) => {
        switch (activeTab) {
          case "all":
            return true;
          case "To-Do":
            return task.status === "to-do";
          case "In-Progress":
            return task.status === "in-progress";
          case "Done":
            return task.status === "done";
          default:
            return false;
        }
      });
    setTasks(values);
  }, [tasks, activeTab]);

  const handleAction = (taskId, action) => {
    setisModal(action);
    setTaskdata(taskId);
  };

  const handleBulkSelect = (taskId) => {
    if (selectedTasks.includes(taskId)) {
      setSelectedTasks(selectedTasks.filter((id) => id !== taskId));
    } else {
      setSelectedTasks([...selectedTasks, taskId]);
    }
  };

  const handleSelectAll = (checked) => {
    if (checked) {
      setSelectedTasks(Tasks.map((task) => task.id));
    } else {
      setSelectedTasks([]);
    }
  };

  const handleBulkUpdate = (status) => {
    Bulk_Update_Tasks(selectedTasks, status);
    setSelectedTasks([]);
  };

  const handleBulkDelete = () => {
    Bulk_Delete_Tasks(selectedTasks);
    setSelectedTasks([]);
  };

  return (
    <div className="container mx-auto py-6">
      <div className="flex flex-col sm:flex-row justify-between">
        <h1 className="text-2xl font-semibold my-4">Project Tasks</h1>

        <div className="bg-white w-full md:w-2/6 flex justify-evenly rounded-md my-4 border-2 border-stone-400 shadow-2xl">
          {["all", "To-Do", "In-Progress", "Done"].map((tab) => (
            <button
              key={tab}
              className={`flex-grow py-2 ${
                activeTab !== tab && "hover:bg-gray-300 hover:text-black"
              } font-semibold transition-colors duration-500 pr-2 ${
                activeTab === tab ? "bg-black text-white" : "bg-transparent"
              }`}
              onClick={() => setActiveTab(tab)}
            >
              {tab.replace("-", " ")}
            </button>
          ))}
        </div>
      </div>

      {selectedTasks.length > 0 && (
        <div className="mb-4 p-4 bg-gray-50 rounded-lg border border-gray-200">
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-700">
              {selectedTasks.length} {selectedTasks.length === 1 ? 'task' : 'tasks'} selected
            </span>
            <div className="flex gap-2">
              <button
                onClick={() => handleBulkUpdate("in-progress")}
                className="inline-flex items-center px-3 py-2 text-sm font-medium rounded-md text-blue-700 bg-blue-50 hover:bg-blue-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
                data-tooltip-id="inProgressTooltip"
              >
                <PlayCircle className="w-4 h-4 mr-2" />
                Start
              </button>
              <Tooltip id="inProgressTooltip" content="Mark as In-Progress" />

              <button
                onClick={() => handleBulkUpdate("done")}
                className="inline-flex items-center px-3 py-2 text-sm font-medium rounded-md text-green-700 bg-green-50 hover:bg-green-100 focus:outline-none focus:ring-2 focus:ring-green-500"
                data-tooltip-id="doneTooltip"
              >
                <CheckCircle className="w-4 h-4 mr-2" />
                Complete
              </button>
              <Tooltip id="doneTooltip" content="Mark as Done" />

              <button
                onClick={handleBulkDelete}
                className="inline-flex items-center px-3 py-2 text-sm font-medium rounded-md text-red-700 bg-red-50 hover:bg-red-100 focus:outline-none focus:ring-2 focus:ring-red-500"
                data-tooltip-id="deleteTooltip"
              >
                <Trash2 className="w-4 h-4 mr-2" />
                Delete
              </button>
              <Tooltip id="deleteTooltip" content="Delete Selected" />
            </div>
          </div>
        </div>
      )}

      <div className="overflow-x-auto shadow-md border border-gray-200 rounded-lg">
        <table className="min-w-full bg-white">
          <thead>
            <tr>
              <th className="px-4 py-3 text-left">
                <input
                  type="checkbox"
                  onChange={(e) => handleSelectAll(e.target.checked)}
                  checked={
                    selectedTasks.length === Tasks?.length && Tasks?.length > 0
                  }
                />
              </th>
              {["Title", "Description", "Created Date", "Created By", "Assigned To", "Status", "Priority", "Action"].map(
                (header) => (
                  <th
                    key={header}
                    className="px-6 py-3 text-left text-sm font-medium text-gray-500 border-b"
                  >
                    {header}
                  </th>
                )
              )}
            </tr>
          </thead>
          <tbody>
            {Tasks && Tasks.length > 0 ? (
              Tasks.map((task) => (
                <tr key={task.id} className="hover:bg-stone-100">
                  <td className="px-4 py-4 text-sm text-gray-500 border-b">
                    <input
                      type="checkbox"
                      onChange={() => handleBulkSelect(task.id)}
                      checked={selectedTasks.includes(task.id)}
                    />
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-700 border-b">{task.title}</td>
                  <td className="px-6 py-4 text-sm text-gray-700 border-b max-w-[200px] truncate">
                  {task.description}</td>
                  <td className="px-6 py-4 text-sm text-gray-700 border-b">{task.created_at}</td>
                  <td className="px-6 py-4 text-sm text-gray-700 border-b">{task.created_by.username}</td>
                  <td className="px-6 py-4 text-sm text-gray-700 border-b">{task.assigned_to.username}</td>
                  <td className="px-6 py-1 text-sm text-gray-500 border-b">
                    <span
                      className={`px-3 py-1 rounded-full text-sm ${
                        task.status === "to-do"
                          ? "bg-blue-100 text-blue-500"
                          : task.status === "in-progress"
                          ? "bg-orange-100 text-orange-500"
                          : "bg-green-100 text-green-500"
                      }`}
                    >
                      {task.status === "to-do"
                        ? "To-Do"
                        : task.status === "in-progress"
                        ? "In-Progress"
                        : "Done"}
                    </span>
                  </td>
                  <td className="px-6 py-1 text-sm text-gray-500 border-b">
                    <span
                      className={`px-3 py-1 rounded-full text-sm ${
                        task.priority === "low"
                          ? "bg-green-100 text-green-500"
                          : task.priority === "medium"
                          ? "bg-yellow-100 text-yellow-500"
                          : "bg-red-100 text-red-500"
                      }`}
                    >
                      {task.priority === "low"
                        ? "Low"
                        : task.priority === "medium"
                        ? "Medium"
                        : "High"}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-500 border-b">
                    <div className="relative inline-block text-left">
                      <Menu>
                        <Menu.Button className="inline-flex justify-center w-full rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-stone-300">
                          Actions
                          <ChevronDownIcon className="ml-2 -mr-1 h-5 w-5 text-gray-400" aria-hidden="true" />
                        </Menu.Button>

                        <Menu.Items className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                          <div className="py-1">
                            <Menu.Item>
                              {({ active }) => (
                                <button
                                  onClick={() => handleAction(task, "Task_View")}
                                  className={`${active ? 'bg-stone-300 text-gray-900' : 'text-gray-700'} block px-4 py-2 text-sm w-full text-left`}
                                >
                                  View
                                </button>
                              )}
                            </Menu.Item>
                            <Menu.Item>
                              {({ active }) => (
                                <button
                                  onClick={() =>
                                    handleAction(
                                      { task, project_id, time: new Date().toISOString() },
                                      "Task_Edit"
                                    )
                                  }
                                  className={`${active ? 'bg-stone-300 text-gray-900' : 'text-gray-700'} block px-4 py-2 text-sm w-full text-left`}
                                >
                                  Edit
                                </button>
                              )}
                            </Menu.Item>
                          </div>
                        </Menu.Items>
                      </Menu>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan="9"
                  className="py-4 text-center text-gray-500 font-semibold"
                >
                  No Task Available
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {isModal && (
        <ModalManager
          userdata={Taskdata}
          modaltype={isModal}
          isModal={setisModal}
        />
      )}
    </div>
  );
};

export default Admin_Task_list;