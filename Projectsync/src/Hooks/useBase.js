import React from 'react'
import { toast } from 'sonner';
import BaseAxios from '../Axios/BaseAxios';
import { AddNewTask_URL, Delete_Tasl_URL, DeleteProject_URL, Edit_Task_URL, Get_Tasks_URL, GetProjectTeam_URL } from '../Utils/Constance';
import useUser from './useUser';
import { useDispatch, useSelector } from 'react-redux';
import { addDeleteProject, addProjectTeam, addRemoveTask, addTasks } from '../Redux/UserSlice';
import { addRemoveProjectList } from '../Redux/AdminSlice';

const useBase = () => {
   const user = useSelector((status)=>status.userdata.userdata)
   const dispatch = useDispatch()


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
                headers:{
                    "Content-Type":"application/json"
                }
            })
            if(response.status === 200){
                console.log(response.data,"get project team")
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
             
             params:{id:data},
             headers:{
                 "Content-Type":"application/json"
             }
         })
         if(response.status===200){
             console.log(response.data,"get tasks")
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
                headers:{
                    "Content-Type":"application/json"
                }
            })
            if(response.status === 201){
                console.log(response.data,"add new task")
                toast.success(response.data)
                Get_Tasks(null,data.project_id)
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
        console.log(data,'data')
        try{

            const response = await BaseAxios.put(Edit_Task_URL,data,{
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
    return {Delete_Project,GetProjectTeam,AddNewTask,Get_Tasks,Delete_Task,EditTasks}

}

export default useBase