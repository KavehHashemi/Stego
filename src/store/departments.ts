import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import { Department, Departments } from '../../types';
import { request } from '../utils';

type initialStateType = {
  departments: Departments | null;
  currentDepartment: Department | undefined;
};

const initialState: initialStateType = {
  departments: null,
  currentDepartment: undefined,
};

export const getDepartments = createAsyncThunk(
  "departments/getDepartments",
  async (): Promise<Departments> => {
    let deps = await request<Departments>(
      "https://collectionapi.metmuseum.org/public/collection/v1/departments"
    );
    return deps;
  }
);

export const departmentsSlice = createSlice({
  name: "departments",
  initialState,
  reducers: {
    setCurrentDepartment: (state: initialStateType, action) => {
      let currentDep: Department | undefined =
        state.departments?.departments.find(
          (dep) => dep.departmentId === action.payload
        );
      state.currentDepartment = currentDep;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getDepartments.fulfilled, (state, action) => {
      state.departments = action.payload;
    });
  },
});

export const { setCurrentDepartment } = departmentsSlice.actions;
export default departmentsSlice.reducer;
