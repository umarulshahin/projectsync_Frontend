import React from 'react'
import AdminAxios from '../Axios/AdminAxios'
import { GetUsers_URL } from '../Utils/Constance'
import { useDispatch } from 'react-redux'
import { addUserList } from '../Redux/AdminSlice'

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

  return {GetUser}
}

export default useAdmin