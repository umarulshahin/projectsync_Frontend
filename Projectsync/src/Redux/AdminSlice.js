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
        addAdmin_Logout : (state, action)=>{
            state.admindata = null
        }
    }
})

export const {addAdmindata,addAdmin_Logout} = AdminSlice.actions;
export default AdminSlice.reducer;