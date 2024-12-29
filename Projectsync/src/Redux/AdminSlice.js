import { createSlice } from "@reduxjs/toolkit";



const AdminSlice = createSlice({
    name:"Admindata",
    
    initialState:{
        admindata : null,
        user_list : null,
        Project_list : null
    },
    reducers:{
        addAdmindata : (state, action)=>{
            state.admindata = action.payload
        },
        addUserList :(state,action)=>{
            state.user_list = action.payload
        },
        addProjectList:(state,action)=>{
            state.Project_list = action.payload
        },
        addAdmin_Logout : (state, action)=>{
            state.admindata = null
            state.user_list = null
        },
    }
})

export const {addAdmindata,addAdmin_Logout,addUserList,addProjectList} = AdminSlice.actions;
export default AdminSlice.reducer;