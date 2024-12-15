import { createSlice } from "@reduxjs/toolkit";



const AdminSlice = createSlice({
    name:"Admindata",
    
    initialState:{
        admindata : null,
    },
    reducers:{
        addAdmindata : (state, action)=>{
            state.admindata = action.payload
        },
        addLogout : (state, action)=>{
            state.admindata = null
        }
    }
})

export const {addAdmindata,addLogout} = AdminSlice.actions;
export default AdminSlice.reducer;