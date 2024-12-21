import React from 'react'
import { toast } from 'sonner';
import BaseAxios from '../Axios/BaseAxios';
import { DeleteProject_URL } from '../Utils/Constance';
import useUser from './useUser';
import { useSelector } from 'react-redux';

const useBase = () => {
   const {Get_User}=useUser()
   const user = useSelector((status)=>status.userdata.userdata)

    const Delete_Project= async (role=null,data)=>{
        console.log(data)   
        try{
              const response = await BaseAxios.delete(DeleteProject_URL,{
                meta:{role},
                data:{id:data},
                header:{
                    "Content-Type":"application/json"
                }
              })
              if(response.status===200){
                console.log(response.data)
                toast.success(response.data)
                if(role === "admin"){

                }else{
                     Get_User(user.user_id)
                }

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
    return {Delete_Project}

}

export default useBase