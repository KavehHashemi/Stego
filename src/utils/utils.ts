import { idsDB } from "../db/artworks";
import { objectURL } from "./consts";
import { Artwork } from "./types";

export async function request<TResponse>(url: string): Promise<TResponse> {
  const response = await fetch(url);
  const data = await response.json();
  return data as TResponse;
}
export const initializeIDsDB = async () => {
  if ((await idsDB.ids.count()) === 0) {
    await idsDB.ids.add({ objectIDs: [], total: 0 }, 1);
  }
};

const N = 6;
// const {artworks} = useAppSelector(state=>state.artworks)
export const getCollections = async (
  array: number[],
  idx: number
): Promise<Artwork[]> => {
  console.log(`index is ${idx} and array has a length of ${array.length}`);

  let pack: number[] = [];
  const index = idx * N;

  // const ids = await idsDB.ids.get(1);
  const ids = array;
  if (array) {
    pack = getNIds(ids, index);
  }
  const data = await getNArtworks(pack);
  return data;
};

const getNIds = (array: number[], index: number): number[] => {
  let pack: number[] = [];
  let m: number = N;
  if (index + N > array.length) {
    m = array.length - index;
  }
  for (let i = index; i < index + m; i++) {
    pack = [...pack, array[i]];
  }
  return pack;
};

const getNArtworks = async (pack: number[]) => {
  let data: Artwork[] = [];
  for (let i = 0; i < pack.length; i++) {
    const x = await fetchArtwork(pack[i]);
    data = [...data, x];
  }
  return data;
};

const fetchArtwork = async (id: number): Promise<Artwork> => {
  const url = `${objectURL}${id}`;
  const artwork = await request<Artwork>(url);
  return artwork;
};
