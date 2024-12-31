import React from "react";
import UserAxios from "../Axios/UserAxios";
import { useDispatch, useSelector } from "react-redux";
import {
  AddNewMember_URL,
  CreateProject_URL,
  EditProject_URL,
  Get_User_URL,
  GetEmployee_URL,
  ProjctStatus_URL,
} from "../Utils/Constance";
import { addEmployees, addProjects, addRemoveMember, addStatusManagement, addUserDetails } from "../Redux/UserSlice";
import { toast } from "sonner";
import useBase from "./useBase";

const useUser = () => {

  const dispatch = useDispatch();
  // const {GetProjectTeam}= useBase()

  const Get_User = async (data) => {
    try {

      const response = await UserAxios.get(Get_User_URL, {
        params: { id: data },
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (response.status === 200) {

        const { user_data, project_data } = response.data || {};

        dispatch(addUserDetails(user_data));
        dispatch(addProjects(project_data));

      }
    } catch (error) {
      console.error(error, "get user error");
      if (error.response?.status === 401) {
        toast.error("Unauthorized access. Please log in again.");
      } else {
        toast.error("Something went wrong. Please log in again.");
      }
    }
  };

  return { Get_User };
};

export default useUser;
