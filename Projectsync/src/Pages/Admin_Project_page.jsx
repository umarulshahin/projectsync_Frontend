import React, { useEffect, useState } from "react";
import useAdmin from "../Hooks/useAdmin";
import { useSelector } from "react-redux";

const Admin_Project_page = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(null);
  const [Modal, setModal] = useState(null);
  
  const projects = useSelector((state)=> state.admindata.Project_list)
 
  const {Get_Projects} = useAdmin()
  useEffect(()=>{
     Get_Projects()
  },[])




  const handleEditProject = (data) => {
    setUpdateProject(data);
    setModal("edit");
  };

  const handleDeleteProject = (data) => {
    setUpdateProject(data);
    setModal("delete");
  };

  return (
    <div className="p-4 md:p-10 bg-orange-200/80 min-h-screen">
      <div className="flex flex-col">
        <h1 className="text-2xl md:text-3xl text-black font-bold mb-5">
          Project Management
        </h1>
        <div className="p-4 md:p-6 rounded-lg shadow-lg bg-white">
          {/* Tabs */}
        

          {/* Table */}
          <div>
            <table className="min-w-full bg-white rounded-lg">
              <thead>
                <tr className="bg-gray-200">
                  <th className="py-3 px-4 text-left text-gray-600 font-semibold">
                    ID
                  </th>
                  <th className="py-3 px-4 text-left text-gray-600 font-semibold">
                    Title
                  </th>
                  <th className="py-3 px-4 text-left text-gray-600 font-semibold">
                    Description
                  </th>
                  <th className="py-3 px-4 text-left text-gray-600 font-semibold">
                    Start Date
                  </th>
                  <th className="py-3 px-4 text-left text-gray-600 font-semibold">
                    End Date
                  </th>
                  <th className="py-3 px-4 text-left text-gray-600 font-semibold">
                    Status
                  </th>
                  <th className="py-3 px-4 text-left text-gray-600 font-semibold">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {projects && projects.length > 0 ? (
                  projects.map((project, index) => (
                    <tr
                      key={project.id}
                      className="relative hover:bg-gray-200 font-semibold transition-colors"
                    >
                      <td className="py-3 px-4">{index + 1}</td>
                      <td className="py-3 px-4">{project.title}</td>
                      <td className="py-3 px-4">{project.description}</td>
                      <td className="py-3 px-4">
                        {new Date(project.start_date).toLocaleDateString()}
                      </td>
                      <td className="py-3 px-4">
                        {new Date(project.end_date).toLocaleDateString()}
                      </td>
                      <td className="py-3 px-4 ">
                        <span className={`${project.status === 'planned' ? 'text-blue-500': project.status === 'active' ? 'text-yellow-500':'text-green-500'}`}>{project.status === 
                            'planned' ? 'Planned' : project.status === 'active' ? 'Active' : 'Completed'}</span></td>
                      <td className="py-3 px-4">
                        <div className="relative inline-block text-left">
                          <button
                            type="button"
                            className="inline-flex w-full justify-center rounded-md border border-orange-200/80 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm ring-1 ring-gray-300 hover:bg-gray-50"
                            onClick={() =>
                              setIsDropdownOpen(
                                isDropdownOpen === project.id ? null : project.id
                              )
                            }
                          >
                            Options
                          </button>
                          {isDropdownOpen === project.id && (
                            <div className="absolute right-0 z-10 mt-2 w-48 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5">
                              <ul className="py-1">
                                <li>
                                  <button
                                    className="block w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-200"
                                    onClick={() => handleEditProject(project)}
                                  >
                                    Edit
                                  </button>
                                </li>
                                <li>
                                  <button
                                    className="block w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-200"
                                    onClick={() => handleDeleteProject(project)}
                                  >
                                    Delete
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
                      <h1 className="text-lg md:text-2xl font-bold text-gray-600">
                        No projects found!
                      </h1>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
            {Modal && (
              <div>
                {/* Your modal handling logic */}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Admin_Project_page;
