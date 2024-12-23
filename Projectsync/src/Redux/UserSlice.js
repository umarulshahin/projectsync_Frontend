import { createSlice } from "@reduxjs/toolkit";
import { act } from "react";

const UserSlice = createSlice({
  name: "userdata",
  initialState: {
    userdata: null,
    userDetails: null,
    employees: null,
    projects: null,
    projectTeam: null,
  },

  reducers: {
    addUserdata: (state, action) => {
      state.userdata = action.payload;
    },
    addUserDetails: (state, action) => {
      state.userDetails = action.payload;
    },
    addEmployees: (state, action) => {
      state.employees = action.payload;
    },
    addProjects: (state, action) => {
      state.projects = action.payload;
    },
    addDeleteProject: (state, action) => {
      const id = action.payload;
      state.projects = state.projects.filter((project) => project.id !== id);
    },
    addProjectTeam: (state, action) => {
      state.projectTeam = action.payload;
    },
    addStatusManagement: (state, action) => {
      const id = action.payload;
      state.projects = state.projects.map((project) => {
        if (project.id === id) {
          return {
            ...project,
            status: project.status === "planned" ? "active" : "Completed",
          };
        }
        return project;
      });
    },
    addRemoveMember:(state,action)=>{
     const id = action.payload
     state.projectTeam = state.projectTeam.filter((project)=>project.id !== id)
    },
    addLogout: (state, action) => {
      state.userdata = null;
      state.userDetails = null;
      state.projects = null;
      state.projectTeam = null;
    },
  },
});

export const {
  addUserdata,
  addLogout,
  addUserDetails,
  addEmployees,
  addProjects,
  addDeleteProject,
  addStatusManagement,
  addProjectTeam,
  addRemoveMember,
} = UserSlice.actions;

export default UserSlice.reducer;
