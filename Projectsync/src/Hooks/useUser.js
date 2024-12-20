import React from 'react'
import UserAxios from '../Axios/UserAxios'
import { useDispatch } from 'react-redux'
import { CreateProject_URL, Get_User_URL, GetEmployee_URL } from '../Utils/Constance'
import { addEmployees, addUserDetails } from '../Redux/UserSlice'
import { toast } from 'sonner'

const useUser = () => {
    const dispatch = useDispatch()
    const Get_User = async(data)=>{
        try{
            console.log(data,'data')
            const response = await UserAxios.get(Get_User_URL,{
                params:{id:data},
                headers:{
                    "Content-Type" : "application/json"
                }
            })
            if(response.status === 200){

                dispatch(addUserDetails(response.data))
            }

        }catch(error){
            console.error(error,'get user error')
            if (error.response?.status === 401) { 
                toast.error("Unauthorized access. Please log in again.");           
    
            }else{
                 toast.error("Something went wrong. Please log in again.")
            }
        }
    }

const CreateProject = async(data)=>{
     
    console.log(data['team'])
    const formdata =new FormData()
    formdata.append('title',data['title'])
    formdata.append('description',data['description'])
    formdata.append('start_date',data['startDate'])
    formdata.append('end_date',data['endDate'])
    data['team'].forEach((member) => {
        formdata.append('team[]', member); 
    });

    try{

        const response = await UserAxios.post(CreateProject_URL,formdata,{
            headers:{
                "Content-Type" : "multipart/form-data"
            }
        })
        if(response.status === 201){
            console.log(response.data,'add new project response ')
            toast.success(response.data[0])
        }

    }catch(error){
        console.error(error,'create project error')
        if (error.response?.status === 401) {
            toast.error("Unauthorized access. Please log in again.");
        } else if (error.response?.status === 400) {
            toast.error("Invalid data submitted. Please check your input.");
        } else {
            toast.error("Something went wrong. Please try again.");
        }

    }
}

const Get_Employee=async()=>{
    try{
       const response = await UserAxios.get(GetEmployee_URL,{

        headers:{
            "Content-Type" : "application/json"
        }
       })
       if(response.status===200){
        console.log(response.data,'get employees')
        dispatch(addEmployees(response.data))
       }
    }catch(error){
        console.error(error,'get employee error')
        if (error.response?.status === 401) { 
            toast.error("Unauthorized access. Please log in again.");           

        }else{
        toast.error("Something went wrong. Please log in again.")
    }
}
}
    return {Get_User,CreateProject,Get_Employee}
}

export default useUser