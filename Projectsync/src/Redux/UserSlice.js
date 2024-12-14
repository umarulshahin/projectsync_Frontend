import { createSlice } from "@reduxjs/toolkit";


const UserSlice = createSlice({
    name : "userdata",
    initialState:{
        userdata:null,
        
    },

    name : "userdata",

    reducers:{
        addUserdata:(state,action)=>{
            state.userdata = action.payload
        },
        addLogout:(state,action)=>{
             state.userdata = null
        }
    }
})

export const {addUserdata,addLogout} = UserSlice.actions;

export default UserSlice.reducer