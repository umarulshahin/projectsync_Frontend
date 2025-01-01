import React, { useState } from "react";
import useBase from "../Hooks/useBase";


const EditProjectModal = ({ projectdata, isModal, isOpen }) => {
  if (!isOpen) return null;

  const [formData, setFormData] = useState(projectdata);
  const [errors, setErrors] = useState({});
  const {EditProject} = useBase()
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: "" })); 
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.title || formData.title.trim() === "") {
      newErrors.title = "Project Name is required.";
    }
    if (!formData.description || formData.description.trim() === "") {
      newErrors.description = "Description is required.";
    }
    if (formData.status === "planned" && !formData.start_date) {
      newErrors.start_date = "Start Date is required for planned projects.";
    }
    if (!formData.end_date) {
      newErrors.end_date = "End Date is required.";
    }
    if (formData.start_date && formData.start_date > formData.end_date) {
      newErrors.start_date = "Start date must be before end date.";
    }
    if (
      projectdata.stutus !== "planned" &&
      formData.end_date < projectdata.start_date
    ) {
      newErrors.end_date = "End date must be after start date.";
    }
    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    let role = null

    if(projectdata?.role === 'admin'){
      role = projectdata?.role
    }

    console.log("Updated Project Data:", formData);
    EditProject(role,formData)
    isModal(false); // Close the modal after successful validation
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-30 flex justify-center items-center z-50">
      <div className="bg-white rounded-lg shadow-lg p-6 w-1/3">
        <h2 className="text-xl font-semibold mb-4">Edit Project</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">
              Project Name
            </label>
            <input
              type="text"
              name="title"
              value={formData.title || ""}
              onChange={handleInputChange}
              className={`border rounded-md w-full border-stone-300 focus:border-stone-400 focus:outline-stone-400  p-2 ${
                errors.title ? "border-red-500" : ""
              }`}
              required
            />
            {errors.title && (
              <p className="text-red-500 text-sm mt-1">{errors.title}</p>
            )}
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">
              Description
            </label>
            <textarea
              name="description"
              value={formData.description || ""}
              onChange={handleInputChange}
              className={`border rounded-md w-full  border-stone-300 focus:border-stone-400 focus:outline-stone-400 p-2 ${
                errors.description ? "border-red-500" : ""
              }`}
              rows={3}
              required
            ></textarea>
            {errors.description && (
              <p className="text-red-500 text-sm mt-1">{errors.description}</p>
            )}
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">Start Date</label>
            <input
              type="date"
              name="start_date"
              disabled={projectdata.status === "planned" ? false : true}
              value={formData.start_date || ""}
              onChange={handleInputChange}
              className={`border rounded-md  border-stone-300 focus:border-stone-400 focus:outline-stone-400 w-full p-2 ${
                errors.start_date ? "border-red-500" : ""
              }`}
            />
            {errors.start_date && (
              <p className="text-red-500 text-sm mt-1">{errors.start_date}</p>
            )}
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">
              End Date / Deadline
            </label>
            <input
              type="date"
              name="end_date"
              value={formData.end_date || ""}
              onChange={handleInputChange}
              className={`border rounded-md  border-stone-300 focus:border-stone-400 focus:outline-stone-400 w-full p-2 ${
                errors.end_date ? "border-red-500" : ""
              }`}
            />
            {errors.end_date && (
              <p className="text-red-500 text-sm mt-1">{errors.end_date}</p>
            )}
          </div>

          <div className="flex justify-end space-x-4">
            <button
              type="button"
              className="bg-gray-300 hover:bg-gray-400 text-black px-4 py-2 rounded-md"
              onClick={() => isModal(false)}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditProjectModal;
