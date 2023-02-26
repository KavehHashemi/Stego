import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import { IDs } from '../../types';
import { idsDB } from '../db/Artworks';
import { request } from '../utils';

type initialStateType = {
  artworksCount: number | null;
  index: number;
};

const initialState: initialStateType = { artworksCount: null, index: 0 };

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
  reducers: {
    IncrementIndex: (state) => {
      state.index++;
      console.log(`state.index is ${state.index}`);
    },
    ResetIndex: (state) => {
      state.index = 0;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getDepartmentsArtworks.fulfilled, (state, action) => {
      idsDB.ids.update(1, action.payload);
      state.artworksCount = action.payload.total;
    });

    builder.addCase(getDepartmentsArtworks.rejected, (state, action) => {
      console.log(`error: ${action.error}`);
    });
  },
});

export const { IncrementIndex, ResetIndex } = artworksSlice.actions;
export default artworksSlice.reducer;
