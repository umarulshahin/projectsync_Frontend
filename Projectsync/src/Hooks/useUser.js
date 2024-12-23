import React from "react";
import UserAxios from "../Axios/UserAxios";
import { useDispatch, useSelector } from "react-redux";
import {
  CreateProject_URL,
  EditProject_URL,
  Get_User_URL,
  GetEmployee_URL,
  ProjctStatus_URL,
} from "../Utils/Constance";
import { addEmployees, addProjects, addRemoveMember, addStatusManagement, addUserDetails } from "../Redux/UserSlice";
import { toast } from "sonner";

const useUser = () => {
  const dispatch = useDispatch();
  const user = useSelector((status)=>status.userdata.userdata)
  const Get_User = async (data) => {
    try {
      console.log(data, "data");
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

  const CreateProject = async (data) => {
    console.log(data["team"]);
    const formdata = new FormData();
    formdata.append("title", data["title"]);
    formdata.append("description", data["description"]);
    formdata.append("start_date", data["startDate"]);
    formdata.append("end_date", data["endDate"]);
    data["team"].forEach((member) => {
      formdata.append("team[]", member);
    });

    try {
      const response = await UserAxios.post(CreateProject_URL, formdata, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      if (response.status === 201) {
        console.log(response.data, "add new project response ");
        toast.success(response.data[0]);
        Get_User(user.user_id)
        
      }
    } catch (error) {
      console.error(error, "create project error");
      if (error.response?.status === 401) {
        toast.error("Unauthorized access. Please log in again.");
      } else if (error.response?.status === 400) {
        toast.error("Invalid data submitted. Please check your input.");
      } else {
        toast.error("Something went wrong. Please try again.");
      }
    }

    dispatch(addEmployees(null));
  };

  const Get_Employee = async () => {
    try {
      const response = await UserAxios.get(GetEmployee_URL, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (response.status === 200) {
        console.log(response.data, "get employees");
        dispatch(addEmployees(response.data));
      }
    } catch (error) {
      console.error(error, "get employee error");
      if (error.response?.status === 401) {
        toast.error("Unauthorized access. Please log in again.");
      } else {
        toast.error("Something went wrong. Please log in again.");
      }
    }
  };

  const UpdateProject = async(urls,data,type)=>{
     try{

      const response = await UserAxios.put(urls,data,{
        headers:{
          "content-Type" : "application/json"
        }
      })
      if(response.status === 200){
           
        if(type && type === 'status'){
          dispatch(addStatusManagement(data))

        }else if (type && type === 'member remove'){
          dispatch(addRemoveMember(data))
        }
        console.log(response.data,'update project')
        toast.success(response.data)
      }

     }catch(error){
      console.error(error,"update project error")
      if(error.response?.status===401){ 
        toast.error("Unauthorized access. Please log in again.")
      }else{
        toast.error("Something went wrong. Please try again.")
      }
     }
  }
  const EditProject = async (data)=>{
    try{
       const response = await UserAxios.patch(EditProject_URL,data,{
        header:{
          "Content-Type":"application/json"
        }
         
       })
       if(response.status ===200){
        console.log(response.data,'edit project')
        toast.success(response.data)
        Get_User(user.user_id)
       }
    }catch(error){
      console.error(error,"edit project error")
      if(error.response?.status===401){   
        toast.error("Unauthorized access. Please log in again.")
      }else{
        toast.error("Something went wrong. Please try again.")
      }
    }
  }
  return { Get_User, CreateProject, Get_Employee,UpdateProject,EditProject };
};

export default useUser;
