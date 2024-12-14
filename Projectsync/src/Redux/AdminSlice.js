import { createSlice } from "@reduxjs/toolkit";



const AmdminSlice = createSlice({
    name : "Admindata",
    initailState :{
        Admindata : null
    },
    reducers : {
        addAdmindata : (state, action)=>{
            state.admindata = action.payload
        },
        addLogout : (state, action)=>{
            state.admindata = null
        }
    }
})

export const {addAdmindata,addLogout} = AmdminSlice.actions;
export default AmdminSlice.reducers;