import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { ArrowLeftIcon } from "@heroicons/react/24/solid";
import useBase from "../Hooks/useBase";
import Spinner from "../Components/spinner";
import NewMember from "../Components/NewMember";
import ModalManager from "../Modals/ModalManager";
import Admin_Task_list from "../Components/Admin_Task_list";

const Admin_Project_Details = () => {
  const location = useLocation();
  const project = location.state;

  const { GetProjectTeam } = useBase();
  const projectTeam = useSelector((state) => state.userdata.projectTeam);
  const [openModal, setOpenModal] = useState(null);
  const [projectdata, setProjectdata] = useState(null);
  const [OpenNewMember, setOpenNewMember] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    if (project) {
      GetProjectTeam("admin", project.id);
    }
  }, [project]);

  const handleRemoveMember = (value) => {
    setOpenModal("remove member");
    value['role'] = 'admin'
    setProjectdata(value);
  };

  const handleAddTask = (value) => {
    setOpenModal("add task");
    value['role']='admin'
    console.log(value,'value')
    setProjectdata(value);
  };

  return (
    <div className="p-6 max-w-7xl mx-auto min-h-screen">
      <div className="flex items-center mb-5">
        <button
          onClick={() => navigate("/adminhome/project")}
          className="border-2 border-orange-300 bg-white hover:bg-orange-100  font-semibold py-2 px-4 rounded-lg text-gray-600 flex items-center"
        >
          <ArrowLeftIcon className="h-5 w-5 mr-2" />
          Back
        </button>
      </div>
      {!project || !projectTeam ? (
        <div className="mt-[200px]">
          <Spinner />
        </div>
      ) : (
        <>
          {/* Page Header */}
          <h1 className="text-3xl font-bold mb-5 text-gray-800">
            Project: {project.title || "Untitled"}
          </h1>
          {/* Project Details */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
            <div className="p-4 bg-white shadow rounded-lg">
              <h2 className="text-lg font-bold text-gray-700">Description</h2>
              <p className="text-gray-600 mt-2 font-semibold">
                {project.description || "N/A"}
              </p>
            </div>
            <div className="p-4 bg-white shadow rounded-lg">
              <h2 className="text-lg font-bold text-gray-700">Start Date</h2>
              <p className="text-gray-600 mt-2 font-semibold">
                {project.start_date || "N/A"}
              </p>
            </div>
            <div className="p-4 bg-white shadow rounded-lg">
              <h2 className="text-lg font-bold text-gray-700">End Date</h2>
              <p className="text-gray-600 mt-2 font-semibold">
                {project.end_date || "N/A"}
              </p>
            </div>
            <div className="p-4 bg-white shadow rounded-lg">
              <h2 className="text-lg font-bold text-gray-700">Created At</h2>
              <p className="text-gray-600 mt-2 font-semibold">
                {project.created_at || "N/A"}
              </p>
            </div>
            <div className="p-4 bg-white shadow rounded-lg">
              <h2 className="text-lg font-bold text-gray-700">Created By</h2>
              <p className="text-gray-600 mt-2 font-semibold">
                {project.created_by.username || "Admin"}
              </p>
            </div>
            <div className="p-4 bg-white shadow rounded-lg">
              <h2 className="text-lg font-bold text-gray-700">Status</h2>
              <p
                className={`mt-2 font-semibold ${
                  project.status === "Completed"
                    ? "text-green-600"
                    : project.status === "In Progress"
                    ? "text-yellow-600"
                    : "text-blue-600"
                }`}
              >
                {project.status || "N/A"}
              </p>
            </div>
          </div>
          {/* Project Team */}
          <div>
            <h2 className="text-2xl font-bold text-gray-800 my-5">
              Project Team
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {projectTeam && projectTeam.length > 0 ? (
                projectTeam.map((member, index) => (
                  <div
                    key={index}
                    className="p-4 bg-white shadow rounded-lg border border-gray-200 flex justify-between items-center"
                  >
                    <p className="text-gray-700 font-semibold">
                      {member.employee.username}
                    </p>
                    {member.employee.username !==
                      project.created_by.username && (
                      <button
                        onClick={() =>
                          handleRemoveMember({
                            id: member.id,
                            name: member.employee.username,
                          })
                        }
                        className="text-red-500 hover:text-red-700"
                      >
                        Remove
                      </button>
                    )}
                  </div>
                ))
              ) : (
                <p className="text-gray-600">No team members assigned.</p>
              )}
            </div>
            <div className="flex justify-center md:justify-end space-x-4">
              <button
                onClick={() => setOpenNewMember(!OpenNewMember)}
                className=" bg-orange-400 rounded-lg py-2 px-4 my-5 font-semibold text-white hover:bg-orange-500"
              >
                Add new member
              </button>

              <button
                onClick={() => handleAddTask({project_id:project.id})}
                className=" bg-blue-500 rounded-lg py-2 px-4 my-5 font-semibold text-white hover:bg-blue-600"
              >
                Add New Task
              </button>
            </div>
          </div>

          {OpenNewMember && (
            <div>
              <NewMember role ={'admin'} member={projectTeam} isOpen={setOpenNewMember} />
            </div>
          )}
          <div className="min-w-7xl">
            <Admin_Task_list project_id={project.id} />
  
            </div>
          {openModal && (
            <ModalManager
              userdata={projectdata}
              modaltype={openModal}
              isModal={setOpenModal}
            />
          )}
        </>
      )}
    </div>
  );
};

export default Admin_Project_Details;
