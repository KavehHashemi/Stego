import { Artwork, IDs } from '../types';
import { idsDB } from './db/Artworks';

async function request<TResponse>(url: string): Promise<TResponse> {
  const response = await fetch(url);
  const data = await response.json();
  return data as TResponse;
}

const fetchArtworkIDs = async (): Promise<IDs> => {
  let ids = await request<IDs>(
    "https://collectionapi.metmuseum.org/public/collection/v1/search?isHighlight=true&isPublicDomain=true&hasImages=true&medium=Paintings&q=%22%22"
  );
  return ids;
};

const fetchArtwork = async (id: number): Promise<Artwork> => {
  let url = `https://collectionapi.metmuseum.org/public/collection/v1/objects/${id}`;
  let artwork = await request<Artwork>(url);
  return artwork;
};

export const storeArtworkIDs = async () => {
  if ((await idsDB.ids.count()) === 0) {
    let ids = await fetchArtworkIDs();
    await idsDB.ids.add(ids);
  }
};

export const getDBSize = async () => {
  let count = await idsDB.ids.get(1);
  if (count) return count.total;
  else return -1;
};

const N = 6;

export const getCollection = async (idx: number): Promise<Artwork[]> => {
  let pack: number[] = [];
  let index = idx * N;
  let ids = await idsDB.ids.get(1);
  if (ids?.objectIDs) {
    pack = getNIds(ids?.objectIDs, index);
  }
  let data = await getNArtworks(pack);
  return data;
};

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
