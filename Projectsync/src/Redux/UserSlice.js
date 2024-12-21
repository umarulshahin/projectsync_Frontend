import { createSlice } from "@reduxjs/toolkit";
import { act } from "react";


const UserSlice = createSlice({
    name : "userdata",
    initialState:{
        userdata:null,
        userDetails:null,
        employees:null,
        projects:null
        
    },

    reducers:{
        addUserdata:(state,action)=>{
            state.userdata = action.payload
        },
        addUserDetails:(state,action)=>{
            state.userDetails=action.payload
        },
        addEmployees:(state,action)=>{
                state.employees = action.payload
        },
        addProjects:(state,action)=>{
          state.projects=action.payload
        },
        addLogout:(state,action)=>{
             state.userdata = null
             state.userDetails = null
             state.projects = null
        },

    }
})

export const {addUserdata,addLogout,addUserDetails,addEmployees,addProjects} = UserSlice.actions;

export default UserSlice.reducer