import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import { status } from "../utils/consts";
import { Artwork, artworksInitialState, IDs } from "../utils/types";
import { request } from "../utils/utils";

const initialState: artworksInitialState = {
  artworks: [],
  total: 0,
  status: status.idle,
  collection: [],
};

export const getDepartmentArtworks = createAsyncThunk(
  "artworks/getDepartmentArtworks",
  async (departmentId: number): Promise<IDs> => {
    const ids = await request<IDs>(
      `https://collectionapi.metmuseum.org/public/collection/v1/objects?departmentIds=${departmentId}`
    );
    return ids;
  }
);

export const getSpecificArtwork = createAsyncThunk(
  "artwork/getSpecificArtwork",
  async (artworkId: number): Promise<Artwork> => {
    const artwork = await request<Artwork>(
      `https://collectionapi.metmuseum.org/public/collection/v1/objects/${artworkId}`
    );
    return artwork;
  }
);

export const artworksSlice = createSlice({
  name: "artworks",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getDepartmentArtworks.pending, (state) => {
      state.status = status.loading;
    });
    builder.addCase(getDepartmentArtworks.fulfilled, (state, action) => {
      state.status = status.successful;
      state.artworks = action.payload.objectIDs;
      state.total = action.payload.total;
    });
    builder.addCase(getDepartmentArtworks.rejected, (state, action) => {
      state.status = status.error;
      console.log(action.error);
    });
    builder.addCase(getSpecificArtwork.fulfilled, (state, action) => {
      state.collection = [...state.collection, action.payload];
    });
  },
});
// export const {  } = artworksSlice.actions;
export default artworksSlice.reducer;
