import React from 'react'
import UserAxios from '../Axios/UserAxios'
import { useDispatch } from 'react-redux'
import { CreateProject_URL, Get_User_URL } from '../Utils/Constance'
import { addUserDetails } from '../Redux/UserSlice'
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
        }
    }

const CreateProject = async(data)=>{

    const formdata =new FormData()
    formdata.append('title',data['title'])
    formdata.append('description',data['description'])
    formdata.append('start_date',data['startDate'])
    formdata.append('end_date',data['endDate'])

    try{

        const response = await UserAxios.post(CreateProject_URL,formdata,{
            headers:{
                "Content-Type" : "multipart/form-data"
            }
        })
        if(response.status === 201){
            console.log(response.data,'add new project response ')
            toast.success('Project created successfully')
        }

    }catch(error){
        console.error(error,'create project error')
    }
}
    return {Get_User,CreateProject}
}

export default useUser