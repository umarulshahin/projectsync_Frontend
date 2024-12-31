import React from 'react'
import { toast } from 'sonner';
import BaseAxios from '../Axios/BaseAxios';
import { AddNewMember_URL, AddNewTask_URL, CreateProject_URL, Delete_Tasl_URL, DeleteProject_URL, Edit_Task_URL, EditProject_URL, Get_Tasks_URL, GetEmployee_URL, GetProjectTeam_URL } from '../Utils/Constance';
import useUser from './useUser';
import { useDispatch, useSelector } from 'react-redux';
import { addDeleteProject, addEmployees, addProjectTeam, addRemoveMember, addRemoveTask, addStatusManagement, addTasks } from '../Redux/UserSlice';
import { addProjectStatus, addRemoveProjectList } from '../Redux/AdminSlice';
import useAdmin from './useAdmin';

const useBase = () => {
   const user = useSelector((status)=>status.userdata.userdata)
   const dispatch = useDispatch()
   const {Get_Projects} = useAdmin()
   const {Get_User} = useUser()

    const Delete_Project= async (role=null,data)=>{
      
        try{
              const response = await BaseAxios.delete(DeleteProject_URL,{
                meta:{role},
                data:{id:data},
                header:{
                    "Content-Type":"application/json"
                }
              })

              if(response.status===200){

                if(role === "admin"){
                    dispatch(addRemoveProjectList(data))
                }else{
                    dispatch(addDeleteProject(data))
                }
                toast.success(response.data)

              }
        }catch(error){
            console.log(error,"delete project error")
            if(error.response?.status===401){   
                toast.error("Unauthorized access. Please log in again.");
            }else{
                toast.warning("Something went wrong. Please try again later.");
            }
        }
    }

    const GetProjectTeam=async(role=null,data) =>{

        try{

            const response =await BaseAxios.get(GetProjectTeam_URL,{
                params:{id:data},
                meta:{role},
                headers:{
                    "Content-Type":"application/json"
                }
            })
            if(response.status === 200){

                dispatch(addProjectTeam(response.data))
            }

        }catch(error){
            console.error(error,"get project team error")
            if(error.response?.status===401){   
                toast.error("Unauthorized access. Please log in again.");
            }else{
                toast.warning("Something went wrong. Please try again later.");
            }
        }
    }

    const Get_Tasks = async (role=null,data)=>{
        
        try{
 
         const response = await BaseAxios.get(Get_Tasks_URL,{
             meta:{role},
             params:{id:data},
             headers:{
                 "Content-Type":"application/json"
             }
         })
         if(response.status===200){

            dispatch(addTasks(response.data))
         }
        }catch(error){
         console.error(error,"get tasks error")
         if(error.response?.status===401){   
             toast.error("Unauthorized access. Please log in again.");
         }else{
             toast.warning("Something went wrong. Please try again later.");
         }
        }
     }   
     
    const AddNewTask= async(role=null,data)=>{
        try{

            const response = await BaseAxios.post(AddNewTask_URL,data,{
                meta:{role},
                headers:{
                    "Content-Type":"application/json"
                }
            })
            if(response.status === 201){
                console.log(response.data,"add new task")
                Get_Tasks(role,data.project_id)
                toast.success(response.data)
            }
        }catch(error){

            console.error(error,"add new task error")
            if(error.response.status === 401){
                toast.error("Unauthorized access. Please log in again.")
            }else{
                toast.error("Something went wrong. Please try again.")
            }
        }
    }


    const Delete_Task = async (role=null,data)=>{

        try{

            const response = await BaseAxios.delete(Delete_Tasl_URL,{
                meta:{role},
                data:{id:data},
                header:{
                    "Content-Type": "application/json"
                }
            })
            if(response.status === 200){
                console.log(response.data,'delete task')

                if(role === 'admin'){
                    console.log('yes admin')
                  
                }else{
                    dispatch(addRemoveTask(data)) 

                }
                toast.success(response.data)
            }

        }catch(error){

            console.error(error,'delete task error')
            if(error.response.status === 401){
                toast.error("Unauthorized access. Please log in again.")
            }else{
                toast.error("Something went wrong. Please try again.")
            }
        }
    }

    const EditTasks=async(role=null,data)=>{
       
        try{

            const response = await BaseAxios.put(Edit_Task_URL,data,{
                meta:{role},
                headers:{
                    "Content-Type" : "application/json"
                }
            })
            if(response.status === 200){

                console.log(response.data,'edit task')
                if(role === 'admin'){
                   console.log('yes admin')
                }else{
                    Get_Tasks(null,data.project_id)

                }
                toast.success(response.data)
            }
        }catch(error){
            console.error(error,'edit task error')
            if(error.response.status === 401){
                toast.error("Unauthorized access. Please log in again.")
            }else{
                toast.warning('Something went wrong. Please try again.')
            }
        }
    }

    const UpdateProject = async( role = null ,urls,data,type)=>{
        try{
   
         const response = await BaseAxios.put(urls,data,{

           meta:{role},
           headers:{
             "content-Type" : "application/json"
           }
         })
         if(response.status === 200){
            console.log(response.data,'update project')

           if(type && type === 'status' && !role){
             dispatch(addStatusManagement(data))
   
           }else if (type && type === 'member remove'){
             dispatch(addRemoveMember(data))

           }else if (type && type === 'status' && role === 'admin'){
               dispatch(addProjectStatus(data))
           }
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
     const EditProject = async (role=null,data)=>{
        try{
           const response = await BaseAxios.patch(EditProject_URL,data,{
            meta:{role},
            headers:{
              "Content-Type":"application/json"
            }
             
           })
           if(response.status ===200){
            console.log(response.data,'edit project')

            if(role === 'admin'){
                Get_Projects()
            }else{
                Get_User(user.user_id)

            }
            toast.success(response.data)
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
      
  const CreateProject = async (role=null,data) => {

    const formdata = new FormData();
    formdata.append("title", data["title"]);
    formdata.append("description", data["description"]);
    formdata.append("start_date", data["startDate"]);
    formdata.append("end_date", data["endDate"]);
    data["team"].forEach((member) => {
       console.log(member,"member");
      formdata.append("team[]", member);
    });

    try {
      const response = await BaseAxios.post(CreateProject_URL, formdata, {
        meta:{role},
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      if (response.status === 201) {

        if(role==='admin'){
          Get_Projects()
        }else{
            Get_User(user.user_id)

        }
        toast.success(response.data[0]);
        
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

  
  const Get_Employee = async (role=null) => {
    try {
      const response = await BaseAxios.get(GetEmployee_URL, {
        meta:{role},
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
  const AddNewMember = async (role=null,data) =>{

    try{

      const response = await BaseAxios.put(AddNewMember_URL,data,{
        meta:{role},
        headers:{
          "Content-Type" : "application/json"
        }
      })

      if(response.status === 200){
   
        GetProjectTeam(role,data.project_id)
        toast.success(response.data)
      }
    }catch(error){
      console.error(error,"add new member error")
      if(error.response?.status===401){
        toast.error("Unauthorized access. Please log in again.")
     }else{
      toast.error("Something went wrong. Please try again.")
     }

    }
  }

    return {Delete_Project,GetProjectTeam,AddNewTask,Get_Tasks,Delete_Task,EditTasks,UpdateProject,EditProject,CreateProject,Get_Employee,AddNewMember}

}

export default useBase