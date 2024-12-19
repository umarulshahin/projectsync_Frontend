import React from 'react'
import AdminAxios from '../Axios/AdminAxios'
import { GetUsers_URL } from '../Utils/Constance'
import { useDispatch } from 'react-redux'
import { addUserList } from '../Redux/AdminSlice'
import { toast } from 'sonner'

const useAdmin = () => {
    const dispatch = useDispatch()
  const GetUser = async () => {
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
        GetUser()
        
      }

    }catch(error){
      console.error(error,'User management error')
      toast.error("Something went wrong. Please try again later.")
    }
  }
  return {GetUser,UserManagement}
}

export default useAdmin