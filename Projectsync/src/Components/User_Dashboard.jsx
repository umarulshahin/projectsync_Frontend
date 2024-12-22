import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import useUser from "../Hooks/useUser";
// import { PlusCircleIcon } from "@heroicons/react/solid";
import ModalManager from "../Modals/ModalManager";
import { PlusCircle, Eye, Trash, Pencil, RotateCw } from "lucide-react";
import { Menu } from "@headlessui/react";

const User_Dashboard = () => {
  const Userdetails = useSelector((state) => state.userdata.userDetails);
  const Userdata = useSelector((state) => state.userdata.userdata);
  const projects = useSelector((state) => state.userdata.projects);

  const [Modal, setModal] = useState(false);
  const [userdata, setUserdata] = useState(null);

  const { is_permission } = Userdetails || {};
  const { Get_User } = useUser();

  useEffect(() => {
    Get_User(Userdata.user_id);
  }, [Userdata]);

  const handleAddProject = () => {
    setModal("addproject");
  };

  const handleDeleteProject = (value) => {
    console.log(value, "delete project");
    setModal("deleteproject");
    setUserdata(value);
  };

  const handleStatusManagement = (value) =>{
    console.log(value, "status management");
    setModal('statusmanagement')
    setUserdata(value)
  }
  return (
    <div className="text-black bg-stone-300 min-h-screen">
      {is_permission && (
        <div className="flex pt-10 pr-8 justify-end">
          <button
            onClick={handleAddProject}
            className="py-2 px-4 flex items-center bg-orange-400 font-semibold rounded-lg text-white hover:bg-orange-500"
          >
            <PlusCircle className="pr-1 h-5 md:pr-2" /> Add New Project
          </button>
        </div>
      )}
      <div className="p-6">
        <h1 className="text-2xl font-bold mb-6 text-gray-800">User Projects</h1>
        <div className="overflow-x-auto bg-white rounded-xl shadow-lg">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-50 border-b border-stone-300">
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">
                  Title
                </th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600 max-w-[200px]">
                  Description
                </th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">
                  Start Date
                </th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">
                  End Date
                </th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">
                  Created By
                </th>
                <th className="px-10 py-4 text-left text-sm font-semibold text-gray-600">
                  Status
                </th>
                <th className="px-10 py-4 text-right text-sm font-semibold text-gray-600">
                  Action
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-300">
              {projects && projects.length > 0 ? (
                projects.map((project, index) => (
                  <tr
                    key={index}
                    className="hover:bg-gray-50 transition-colors"
                  >
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">
                      {project.title}
                    </td>
                    <td
                      className="px-6 py-4 text-sm text-gray-600 max-w-[200px] truncate"
                      title={project.description}
                    >
                      {project.description}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                      {project.start_date}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                      {project.end_date}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                      {project.created_by.username}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-medium ${
                          project.status === "planned"
                            ? "bg-green-100 text-blue-500"
                            : project.status === "active"
                            ? "bg-green-100 text-yellow-600"
                            : project.status === "Completed"
                            ? "bg-yellow-100 text-green-500"
                            : "bg-gray-100 text-gray-800"
                        }`}
                      >
                        {project.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right">
                      <Menu
                        as="div"
                        className="relative inline-block text-left"
                      >
                        <Menu.Button className="inline-flex justify-center items-center px-4 py-2 text-sm font-medium text-gray-700 bg-white rounded-md border border-stone-300 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500">
                          Actions
                        </Menu.Button>
                        <Menu.Items className="absolute z-10 right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 divide-y divide-gray-100 focus:outline-none">
                          <div className="py-1">
                            <Menu.Item>
                              {({ active }) => (
                                <button
                                  className={`${
                                    active
                                      ? "bg-gray-50 text-gray-900"
                                      : "text-gray-700"
                                  } flex items-center w-full px-4 hover:bg-stone-300 py-2 text-sm`}
                                >
                                  <Eye className="h-4 w-4 mr-3  text-gray-500" />{" "}
                                  View
                                </button>
                              )}
                            </Menu.Item>
                            <Menu.Item>
                              {({ active }) => (
                                <button
                                  onClick={()=> handleStatusManagement({id:project.id,status:project.status,title:project.title})}
                                  className={`${
                                    active
                                      ? "bg-gray-50 text-gray-900"
                                      : "text-gray-700"
                                  } flex items-center w-full px-4 py-2 hover:bg-stone-300 text-sm`}
                                >
                                  <RotateCw className="h-4 w-4 mr-3  text-gray-500" />{" "}
                                  Change Status
                                </button>
                              )}
                            </Menu.Item>
                            <div className="py-1">
                              {is_permission && (
                                <>
                                  <Menu.Item>
                                    {({ active }) => (
                                      <button
                                        className={`${
                                          active
                                            ? "bg-gray-50 text-gray-900"
                                            : "text-gray-700"
                                        } flex items-center w-full hover:bg-stone-300 px-4 py-2 text-sm`}
                                      >
                                        <Pencil className="h-4 w-4 mr-3 text-gray-500" />{" "}
                                        Edit
                                      </button>
                                    )}
                                  </Menu.Item>
                                  <Menu.Item>
                                    {({ active }) => (
                                      <button
                                        onClick={() =>
                                          handleDeleteProject({
                                            id: project.id,
                                            projectName: project.title,
                                          })
                                        }
                                        className={`${
                                          active
                                            ? "bg-red-50 text-red-900"
                                            : "text-red-700"
                                        } flex items-center w-full hover:bg-stone-300 px-4 py-2 text-sm`}
                                      >
                                        <Trash className="h-4 w-4 mr-3 text-red-500" />{" "}
                                        Delete
                                      </button>
                                    )}
                                  </Menu.Item>
                                </>
                              )}
                            </div>
                          </div>
                        </Menu.Items>
                      </Menu>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan="7"
                    className="px-6 py-8 text-center text-gray-500 text-sm"
                  >
                    No projects found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
      {Modal && (
        <ModalManager
          userdata={userdata}
          modaltype={Modal}
          isModal={setModal}
        />
      )}
    </div>
  );
};

export default User_Dashboard;
