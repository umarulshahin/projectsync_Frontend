import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import useBase from "../Hooks/useBase";
import { useSelector } from "react-redux";
import Spinner from "./spinner";
import ModalManager from "../Modals/ModalManager";
import { ArrowLeftIcon } from '@heroicons/react/24/solid';

const ProjectDetailsPage = () => {
  const { state } = useLocation(); // Assuming project data is passed in `state`
  const [tasks, setTasks] = useState(state?.tasks || []);
  const [newTask, setNewTask] = useState("");
  const project = state || {};
  const { GetProjectTeam } = useBase();
  const projectTeam = useSelector((state) => state.userdata.projectTeam);
  const [openModal, setopenModal] = useState(null);
  const [projectdata, setProjectdata] = useState(null);
  const navigate = useNavigate()
  const handleAddTask = () => {
    if (!newTask.trim()) {
      alert("Task cannot be empty");
      return;
    }
    setTasks((prev) => [...prev, { name: newTask }]);
    setNewTask("");
  };

  useEffect(() => {
    GetProjectTeam(null, project.id);
  }, [project]);

  const handleRemoveMember = (value) => {
    console.log(value, "remove member");
    setopenModal("remove member");
    setProjectdata(value);
  };
  return (
    <>
      {" "}
      {projectTeam && projectTeam.length < 0 ? (
        <Spinner />
      ) : (
        <div className="p-6 max-w-7xl mx-auto  pt-20">
            <div className="flex items-center mb-5">
      <button onClick={()=>navigate(-1)} className="border-2 border-stone-400 font-semibold py-2 px-4 rounded-lg text-gray-600 flex items-center">
        <ArrowLeftIcon className="h-5 w-5 mr-2" />
        Back
      </button>
    </div>
         
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
                {project.created_by.username || "N/A"}
              </p>
            </div>
            <div className="p-4 bg-white shadow rounded-lg">
              <h2 className="text-lg font-bold text-gray-700">Status</h2>
              <p
                className={`mt-2 font-semibold ${
                  project.status === "Completed"
                    ? "text-green-600"
                    : project.status === "In Progress"
                    ? "text-blue-600"
                    : "text-gray-600"
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
            <div className="flex justify-end">
              <button className=" bg-orange-400 rounded-lg py-2 px-4 my-5 font-semibold text-white hover:bg-orange-500">
                Add new member
              </button>
            </div>
          </div>

          {/* Tasks Section */}
          <div className="mb-10">
            <h2 className="text-2xl font-bold text-gray-800 my-5">Tasks</h2>
            <div className="flex items-center gap-2 mb-6">
              <input
                type="text"
                value={newTask}
                onChange={(e) => setNewTask(e.target.value)}
                className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Add a new task"
              />
              <button
                onClick={handleAddTask}
                className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
              >
                Add
              </button>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {tasks.map((task, index) => (
                <div
                  key={index}
                  className="p-4 bg-white shadow rounded-lg border border-gray-200"
                >
                  <p className="text-gray-700">{task.name}</p>
                </div>
              ))}
            </div>
          </div>

          {openModal && (
            <ModalManager
              userdata={projectdata}
              modaltype={openModal}
              isModal={setopenModal}
            />
          )}
        </div>
      )}
    </>
  );
};

export default ProjectDetailsPage;
