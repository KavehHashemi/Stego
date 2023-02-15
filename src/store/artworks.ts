import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import { IDs } from '../../types';
import { idsDB } from '../db/Artworks';
import { request } from '../utils';

type initialStateType = {
  artworksCount: number;
};
const initialState: initialStateType = { artworksCount: 0 };

export const getDepartmentsArtworks = createAsyncThunk(
  "artworks/getDepartmentsArtworks",
  async (departmentId: number): Promise<IDs> => {
    let ids = await request<IDs>(
      `https://collectionapi.metmuseum.org/public/collection/v1/objects?departmentIds=${departmentId}`
    );
    return ids;
  }
);
export const artworksSlice = createSlice({
  name: "artworks",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getDepartmentsArtworks.fulfilled, (state, action) => {
      idsDB.ids.update(1, action.payload).then(() => {
        state.artworksCount = action.payload.total;
      });
      console.log(`count is ${state.artworksCount}`);
    });
  },
});

export const {} = artworksSlice.actions;
export default artworksSlice.reducer;
