import { createSlice } from "@reduxjs/toolkit";
import { act } from "react";


const UserSlice = createSlice({
    name : "userdata",
    initialState:{
        userdata:null,
        userDetails:null,
        employees:null
        
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
        addLogout:(state,action)=>{
             state.userdata = null
             state.userDetails = null
        },

    }
})

export const {addUserdata,addLogout,addUserDetails,addEmployees} = UserSlice.actions;

export default UserSlice.reducer