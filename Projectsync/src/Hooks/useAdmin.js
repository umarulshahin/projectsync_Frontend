import React from 'react'
import AdminAxios from '../Axios/AdminAxios'
import { GetProjects_URL, GetUsers_URL } from '../Utils/Constance'
import { useDispatch } from 'react-redux'
import { addProjectList, addUserList } from '../Redux/AdminSlice'
import { toast } from 'sonner'

const useAdmin = () => {
    const dispatch = useDispatch()
  const GetUsers = async () => {
    try{
       const response =await AdminAxios.get(GetUsers_URL,{
        headers:{
            "Content-Type": "application/json"
        }

       })
       if (response.status === 200){
        console.log(response.data)
        dispatch(addUserList(response.data))
       }
    }catch(error){
      console.error(error,'Admin users get error')
      
    }
  }

  const UserManagement = async(urls,data)=>{

    try{
      
      const response = await AdminAxios.post(urls,data,{
        headers:{
          "Content-Type": "application/json"
        }
      })
      if (response.status === 200){
        console.log(response.data,'usermanagement')
        toast.success(response.data.message)
        GetUsers()
        
      }

    }catch(error){
      console.error(error,'User management error')
      toast.error("Something went wrong. Please try again later.")
    }
  }

  const Get_Projects = async ()=>{
    try{
      const response = await AdminAxios.get(GetProjects_URL,{
        headers:{
          "Content-Type" : "application/json"
        }
      })
      if(response.status ===200){
        dispatch(addProjectList(response.data))
      }

    }catch(error){
      console.log(error,'get projects error')
      if(error.response?.status === 401){
        toast.error("unauthorized access place login again")
      }else{
        toast.error("something went wrong please try again")
      }
    }
  }
  return {GetUsers,UserManagement,Get_Projects}
}

export default useAdmin