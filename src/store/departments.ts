import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import { Departments, departmentsInitialState } from "../utils/types";
import { request } from "../utils/utils";

const initialState: departmentsInitialState = {
  departments: [],
  currentDepartment: -1,
};

export const getDepartments = createAsyncThunk(
  "departments/getDepartments",
  async (): Promise<Departments> => {
    const deps = await request<Departments>(
      "https://collectionapi.metmuseum.org/public/collection/v1/departments"
    );
    return deps;
  }
);

export const departmentsSlice = createSlice({
  name: "departments",
  initialState,
  reducers: {
    setCurrent: (state, action) => {
      state.currentDepartment = action.payload;
      console.log(state.currentDepartment);
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getDepartments.fulfilled, (state, action) => {
      state.departments = action.payload.departments;
    });
  },
});
export const { setCurrent } = departmentsSlice.actions;
export default departmentsSlice.reducer;
