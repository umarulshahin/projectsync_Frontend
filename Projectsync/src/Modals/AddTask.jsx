import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { XMarkIcon } from '@heroicons/react/24/outline';
import { useSelector } from 'react-redux';
import * as Yup from 'yup';
import useBase from '../Hooks/useBase';

const validationSchema = Yup.object().shape({
  title: Yup.string()
    .min(3, 'Title must be at least 3 characters')
    .max(100, 'Title must be less than 100 characters')
    .required('Title is required'),
  description: Yup.string()
    .min(10, 'Description must be at least 10 characters')
    .max(500, 'Description must be less than 500 characters')
    .required('Description is required'),
  priority: Yup.string()
    .oneOf(['low', 'medium', 'high'], 'Invalid priority')
    .required('Priority is required'),
  assignedTo: Yup.string()
    .required('Please assign this task to a team member')
});

const AddTask = ({ projectdata, isModal, isOpen }) => {
  const Team = useSelector((state) => state.userdata.projectTeam);
  const {AddNewTask} = useBase()

  if (!isOpen) return null;

  const initialValues = {
    title: '',
    description: '',
    priority: 'medium',
    assignedTo: ''
  };

  const handleSubmit = (values, { setSubmitting }) => {
    console.log(projectdata)
    values['project_id'] = projectdata
    console.log(values);
    AddNewTask(null,values)
    setSubmitting(false);
    isModal(false);
  };

  const FormField = ({ name, label, ...props }) => (
    <div>
      <label htmlFor={name} className="block text-sm font-medium text-gray-700 mb-1">
        {label}
      </label>
      <Field
        id={name}
        name={name}
        className="w-full rounded-md border border-stone-300 px-3 py-2 focus:border-stone-400 focus:outline-none focus:ring-1 focus:ring-stone-400"
        {...props}
      />
      <ErrorMessage
        name={name}
        component="p"
        className="mt-1 text-sm text-red-600"
      />
    </div>
  );

  const priorityOptions = [
    { value: 'low', label: 'Low' },
    { value: 'medium', label: 'Medium' },
    { value: 'high', label: 'High' }
  ];

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div 
        className="fixed inset-0 bg-black bg-opacity-50 transition-opacity"
        onClick={() => isModal(false)}
      />

      <div className="flex min-h-screen items-center justify-center p-4">
        <div className="relative w-full max-w-md transform rounded-lg bg-white p-6 shadow-xl transition-all">
          <button
            onClick={() => isModal(false)}
            className="absolute right-4 top-4 text-gray-400 hover:text-gray-500"
          >
            <XMarkIcon className="h-5 w-5" />
          </button>

          <h2 className="text-xl font-semibold text-gray-900 mb-6">Create New Task</h2>

          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            {({ isSubmitting }) => (
              <Form className="space-y-4">
                <FormField
                  name="title"
                  label="Task Title"
                  placeholder="Enter task title"
                  
                />

                <FormField
                  name="description"
                  label="Description"
                  as="textarea"
                  rows={4}
                  placeholder="Enter task description"
                />

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Priority
                  </label>
                  <Field
                    as="select"
                    name="priority"
                    className="w-full rounded-md border border-stone-300 px-3 py-2 focus:border-stone-400 focus:outline-none focus:ring-1 focus:ring-stone-400"
                  >
                    {priorityOptions.map(option => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </Field>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Assign To
                  </label>
                  <Field
                    as="select"
                    name="assignedTo"
                    className="w-full rounded-md border border-stone-300 px-3 py-2 focus:border-stone-400 focus:outline-none focus:ring-1 focus:ring-stone-400"
                  >
                    <option value="">Select team member</option>
                    {Team?.map(member => (
                      <option key={member.employee.id} value={member.employee.id}>
                        {member.employee.username}
                      </option>
                    ))}
                  </Field>
                </div>

                <div className="flex justify-end gap-3 mt-6">
                  <button
                    type="button"
                    onClick={() => isModal(false)}
                    className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-stone-300 rounded-md hover:bg-stone-400 hover:text-white"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 disabled:opacity-50"
                  >
                    Create Task
                  </button>
                </div>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </div>
  );
};

export default AddTask;