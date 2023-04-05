import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import { Artwork, IDs } from "../../types";
import { idsDB } from "../db/Artworks";
import { request } from "../utils";

type initialStateType = {
  artworksCount: number;
  index: number;
  collection: Artwork[];
};

const initialState: initialStateType = {
  artworksCount: 0,
  index: 0,
  collection: [],
};

export const getDepartmentsArtworks = createAsyncThunk(
  "artworks/getDepartmentsArtworks",
  async (departmentId: number): Promise<IDs> => {
    let ids = await request<IDs>(
      `https://collectionapi.metmuseum.org/public/collection/v1/objects?departmentIds=${departmentId}`
    );
    return ids;
  }
);

const N = 6;

export const getCollections = createAsyncThunk(
  "artworks/getCollections",
  async (idx: number): Promise<Artwork[]> => {
    let pack: number[] = [];
    let index = idx * N;
    let ids = await idsDB.ids.get(1);
    if (ids?.objectIDs) {
      pack = getNIds(ids?.objectIDs, index);
    }
    let data = await getNArtworks(pack);
    return data;
  }
);

const getNIds = (array: number[], index: number): number[] => {
  let pack: number[] = [];
  let m: number = N;
  if (index + N > array.length) {
    m = array.length - index;
  }
  for (let i = index; i < index + m; i++) {
    pack.push(array[i]);
  }
  return pack;
};

const getNArtworks = async (pack: number[]) => {
  let data: Artwork[] = [];
  for (let i = 0; i < pack.length; i++) {
    let x = await fetchArtwork(pack[i]);
    data.push(x);
  }
  return data;
};

const fetchArtwork = async (id: number): Promise<Artwork> => {
  let url = `https://collectionapi.metmuseum.org/public/collection/v1/objects/${id}`;
  let artwork = await request<Artwork>(url);
  return artwork;
};

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
      ResetCollection();
    },
    ResetCollection: (state: initialStateType) => {
      state.collection = [];
      console.log(`state.collection is ${state.collection}`);
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getDepartmentsArtworks.fulfilled, (state, action) => {
      idsDB.ids.update(1, action.payload);
      state.artworksCount = action.payload.total;
    });
    builder.addCase(getDepartmentsArtworks.pending, (state, action) => {});
    builder.addCase(getDepartmentsArtworks.rejected, (state, action) => {
      console.log(`error: ${action.error}`);
    });
    builder.addCase(
      getCollections.fulfilled,
      (state: initialStateType, action) => {
        action.payload.map((res) => state.collection.push(res));
      }
    );
  },
});

export const { IncrementIndex, ResetIndex, ResetCollection } =
  artworksSlice.actions;
export default artworksSlice.reducer;
