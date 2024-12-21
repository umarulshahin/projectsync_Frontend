import React, { useEffect } from "react";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import DatePicker from "react-datepicker";
import { XMarkIcon } from "@heroicons/react/24/outline";
import "react-datepicker/dist/react-datepicker.css";
import Select from "react-select";
import useUser from "../Hooks/useUser";
import { format } from "date-fns";
import { useSelector } from "react-redux";
import Spinner from "../Components/spinner";

const validationSchema = Yup.object().shape({
  title: Yup.string()
    .min(3, "Title must be at least 3 characters")
    .max(100, "Title must be less than 100 characters")
    .required("Title is required"),
  description: Yup.string()
    .min(5, "Description must be at least 5 characters")
    .max(500, "Description must be less than 500 characters")
    .required("Description is required"),
  startDate: Yup.date().required("Start date is required"),
  endDate: Yup.date()
    .min(Yup.ref("startDate"), "End date must be after start date")
    .required("End date is required"),
  team: Yup.array()
    .min(1, "At least one team member must be selected")
    .required("Team is required"),
});

const AddProject = ({ isModal, isOpen }) => {
  if (!isOpen) return null;

  const { CreateProject, Get_Employee } = useUser();
  const employee = useSelector((state) => state.userdata.employees);

  const initialValues = {
    title: "",
    description: "",
    startDate: new Date(),
    endDate: new Date(),
    team: [],
  };

  const handleSubmit = (values, { setSubmitting, resetForm }) => {
    const formattedValues = {
      ...values,
      startDate: format(values.startDate, "yyyy-MM-dd"),
      endDate: format(values.endDate, "yyyy-MM-dd"),
      team: values.team.map((member) => parseInt(member.value)), 
    };
    
    console.log(formattedValues)
    CreateProject(formattedValues);
    setSubmitting(false);
    resetForm();
    isModal(null);
  };

  useEffect(() => {
    Get_Employee();
  }, []);

  const formatEmployeeOptions = () => {
    return employee
      ? employee.map((emp) => ({
          value: emp.id,
          label: `${emp.username}`,
        }))
      : [];
  };

  return (
    <>
      {!employee ? (
        <div>
          <Spinner />
        </div>
      ) : (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-black bg-opacity-50 transition-opacity"
            onClick={() => isModal(null)}
          />

          {/* Modal */}
          <div className="flex min-h-full items-center justify-center p-4">
            <div className="relative w-full max-w-md transform rounded-lg bg-white p-6 shadow-xl transition-all">
              {/* Close button */}
              <button
                onClick={() => isModal(null)}
                className="absolute right-4 top-4 text-gray-400 hover:text-gray-500"
              >
                <XMarkIcon className="h-5 w-5" />
              </button>

              <h2 className="text-2xl font-semibold text-gray-800 mb-6">
                Create New Project
              </h2>

              <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={handleSubmit}
              >
                {({ errors, touched, setFieldValue, values }) => (
                  <Form className="space-y-4">
                    <div>
                      <label
                        htmlFor="title"
                        className="block text-sm font-medium text-gray-700 mb-1"
                      >
                        Project Title
                      </label>
                      <Field
                        type="text"
                        name="title"
                        className="w-full rounded-md border-2 border-stone-300 px-3 py-2  focus:border-stone-400 focus:outline-none "
                        placeholder="Enter project title"
                      />
                      {errors.title && touched.title && (
                        <p className="mt-1 text-sm text-red-600">
                          {errors.title}
                        </p>
                      )}
                    </div>

                    <div>
                      <label
                        htmlFor="description"
                        className="block text-sm font-medium text-gray-700 mb-1"
                      >
                        Description
                      </label>
                      <Field
                        as="textarea"
                        name="description"
                        rows={4}
                        className="w-full rounded-md  border-2 border-stone-300 px-3 py-2 focus:border-stone-400 focus:outline-none "
                        placeholder="Enter project description"
                      />
                      {errors.description && touched.description && (
                        <p className="mt-1 text-sm text-red-600">
                          {errors.description}
                        </p>
                      )}
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Start Date
                        </label>
                        <DatePicker
                          selected={values.startDate}
                          onChange={(date) =>
                            setFieldValue("startDate", date)
                          }
                          className="w-full rounded-md border-2 border-stone-300 px-3 py-2 focus:border-stone-400 focus:outline-none"
                          dateFormat="yyyy-MM-dd"
                          minDate={new Date()}
                        />
                        {errors.startDate && touched.startDate && (
                          <p className="mt-1 text-sm text-red-600">
                            {errors.startDate}
                          </p>
                        )}
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          End Date
                        </label>
                        <DatePicker
                          selected={values.endDate}
                          onChange={(date) =>
                            setFieldValue("endDate", date)
                          }
                          className="w-full rounded-md border-2 border-stone-300 px-3 py-2 focus:border-stone-400 focus:outline-none"
                          dateFormat="yyyy-MM-dd"
                          minDate={values.startDate}
                        />
                        {errors.endDate && touched.endDate && (
                          <p className="mt-1 text-sm text-red-600">
                            {errors.endDate}
                          </p>
                        )}
                      </div>
                    </div>

                    <div>
                      <label
                        htmlFor="team"
                        className="block text-sm font-medium text-gray-700 mb-1"
                      >
                        Assign Team Members
                      </label>
                      <Select
                        options={formatEmployeeOptions()}
                        isMulti
                        name="team"
                        value={values.team}
                        onChange={(selectedOptions) =>
                          setFieldValue("team", selectedOptions)
                        }
                        className="w-full rounded-md"
                      />
                      {errors.team && touched.team && (
                        <p className="mt-1 text-sm text-red-600">
                          {errors.team}
                        </p>
                      )}
                    </div>

                    <div className="flex justify-end gap-3 mt-6">
                      <button
                        type="button"
                        onClick={() => isModal(null)}
                        className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border-2 border-stone-300 rounded-md hover:bg-stone-200"
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        className="px-4 py-2 text-sm font-medium text-white bg-orange-400 rounded-md hover:bg-orange-500"
                      >
                        Create Project
                      </button>
                    </div>
                  </Form>
                )}
              </Formik>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default AddProject;
