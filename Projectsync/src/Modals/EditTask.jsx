import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { X } from "lucide-react";
import { useSelector } from "react-redux";
import useBase from "../Hooks/useBase";

const statusOptions = ["to-do", "in-progress", "done"];
const priorityOptions = ["low", "medium", "high"];

const validationSchema = Yup.object({
  title: Yup.string().required("Title is required"),
  description: Yup.string().required("Description is required"),
  assignedTo: Yup.string().required("Please select an assignee"),
  status: Yup.string().required("Please select a status"),
  priority: Yup.string().required("Please select a priority"),
});

const EditTask = ({ Task_data, isModal, isOpen }) => {
  if (!isOpen) return null;

  const employee = useSelector((state) => state.userdata.projectTeam);
  const userdata = useSelector((state) => state.userdata.userDetails);
  const { project_id } = Task_data;
  const Taskdata = Task_data.task;
  console.log(Task_data ,'task data');
  
  const employees = employee && Array.isArray(employee) && employee.length > 0 ? employee.map((emp) => emp.employee) : [];

  const { EditTasks } = useBase();

  console.log(Taskdata,'task data');
  // Helper function to move the current value to the top
  const prioritizeCurrentValue = (options, currentValue, key) => {

    console.log(options, currentValue, key,'current values');
    const prioritized = options.filter((opt) => opt[key] === currentValue);
    const others = options.filter((opt) => opt[key] !== currentValue);
    return [...prioritized, ...others];
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center  justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-md relative">
        <button
          onClick={() => isModal(null)}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
        >
          <X size={20} />
        </button>

        <h2 className="text-xl font-semibold mb-4">Edit Task</h2>

        <Formik
          initialValues={{
            title: Taskdata.title || "",
            description: Taskdata.description || "",
            assignedTo: Taskdata.assigned_to.id || "",
            status: Taskdata.status || "",
            priority: Taskdata.priority || "",
          }}
          validationSchema={validationSchema}
          onSubmit={(values) => {
            values["task_id"] = Taskdata.id;
            values["project_id"] = project_id;
            console.log("Updated Task:", values);

            EditTasks(null, values);
            isModal(null);
          }}
        >
          {({ isSubmitting }) => (
            <Form className="space-y-4">
              <div>
                <label
                  htmlFor="title"
                  className="block text-sm font-medium text-gray-700"
                >
                  Title
                </label>
                <Field
                  disabled={userdata.is_permission === false ? true : false}
                  type="text"
                  name="title"
                  className="mt-1 py-2 block w-full rounded-md border-stone-300 shadow-sm focus:border-stone-400 focus:ring-stone-400"
                />
                <ErrorMessage
                  name="title"
                  component="div"
                  className="text-red-500 text-sm mt-1"
                />
              </div>

              <div>
                <label
                  htmlFor="description"
                  className="block text-sm font-medium text-gray-700"
                >
                  Description
                </label>
                <Field
                  disabled={userdata.is_permission === false ? true : false}
                  as="textarea"
                  name="description"
                  rows={3}
                  className="mt-1 block w-full rounded-md border-stone-300 shadow-sm focus:border-stone-400 focus:ring-stone-400"
                />
                <ErrorMessage
                  name="description"
                  component="div"
                  className="text-red-500 text-sm mt-1"
                />
              </div>

              <div>
                <label
                  htmlFor="assignedTo"
                  className="block text-sm font-medium text-gray-700"
                >
                  Assigned To
                </label>
                <Field
                  disabled={userdata.is_permission === false ? true : false}
                  as="select"
                  name="assignedTo"
                  className="mt-1 py-2 block w-full rounded-md border-stone-300 shadow-sm focus:border-stone-400 focus:ring-stone-400"
                >
                  {prioritizeCurrentValue(
                    employees,
                    Taskdata.assigned_to.id,
                    "id"
                  ).map((assignee) => (
                    <option key={assignee.id} value={assignee.id}>
                      {assignee.username}
                    </option>
                  ))}
                </Field>
                <ErrorMessage
                  name="assignedTo"
                  component="div"
                  className="text-red-500 text-sm mt-1"
                />
              </div>

              <div>
                <label
                  htmlFor="status"
                  className="block text-sm font-medium text-gray-700"
                >
                  Status
                </label>
                <Field
                  as="select"
                  name="status"
                  className="mt-1 py-2 block w-full rounded-md border-stone-300 shadow-sm focus:border-stone-400 focus:ring-stone-400"
                >
                  {prioritizeCurrentValue(statusOptions, Taskdata.status).map(
                    (status) => (
                      <option key={status} value={status}>
                        {status}
                      </option>
                    )
                  )}
                </Field>
                <ErrorMessage
                  name="status"
                  component="div"
                  className="text-red-500 text-sm mt-1"
                />
              </div>

              <div>
                <label
                  htmlFor="priority"
                  className="block text-sm font-medium text-gray-700"
                >
                  Priority
                </label>
                <Field
                  disabled={userdata.is_permission === false ? true : false}
                  as="select"
                  name="priority"
                  className="mt-1 py-2 block w-full rounded-md border-stone-300 shadow-sm focus:border-stone-400 focus:ring-stone-400"
                >
                  {prioritizeCurrentValue(
                    priorityOptions,
                    Taskdata.priority
                  ).map((priority) => (
                    <option key={priority} value={priority}>
                      {priority}
                    </option>
                  ))}
                </Field>
                <ErrorMessage
                  name="priority"
                  component="div"
                  className="text-red-500 text-sm mt-1"
                /> 
              </div>
              <div className="w-full flex justify-center">
              {userdata.is_permission === false && (
                <span className="text-sm text-gray-500 text-center">You only have permission to edit the task status.</span>
              )}
              </div>
             
              <div className="flex justify-end space-x-3 pt-4">
                <button
                  type="button"
                  onClick={() => isModal(null)}
                  className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  Save Changes
                </button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default EditTask;
