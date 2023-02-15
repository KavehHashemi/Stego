import { createSlice } from '@reduxjs/toolkit';

const initialState = {};
export const artworksSlice = createSlice({
  name: "artworks",
  initialState,
  reducers: {},
  extraReducers: (builder) => {},
});

export const {} = artworksSlice.actions;
export default artworksSlice.reducer;
