import { createSlice } from "@reduxjs/toolkit";
import { act } from "react";


const UserSlice = createSlice({
    name : "userdata",
    initialState:{
        userdata:null,
        userDetails:null,
        
    },

    reducers:{
        addUserdata:(state,action)=>{
            state.userdata = action.payload
        },
        addUserDetails:(state,action)=>{
            state.userDetails=action.payload
        },
        addLogout:(state,action)=>{
             state.userdata = null
             state.userDetails = null
        }
    }
})

export const {addUserdata,addLogout,addUserDetails} = UserSlice.actions;

export default UserSlice.reducer