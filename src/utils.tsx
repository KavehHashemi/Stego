import { Artwork, Departments, IDs } from '../types';
import { departmentsdb, idsDB } from './db/Artworks';

async function request<TResponse>(url: string): Promise<TResponse> {
  const response = await fetch(url);
  const data = await response.json();
  return data as TResponse;
}

const fetchArtworkIDs = async (departmentId: number): Promise<IDs> => {
  let ids = await request<IDs>(
    // "https://collectionapi.metmuseum.org/public/collection/v1/search?isHighlight=true&isPublicDomain=true&hasImages=true&medium=Paintings&q=%22q%22"
    // "https://collectionapi.metmuseum.org/public/collection/v1/search?isHighlight=true&isPublicDomain=true&hasImages=true&departmentIds=17&q=%22%22"
    `https://collectionapi.metmuseum.org/public/collection/v1/objects?departmentIds=${departmentId}`
  );
  return ids;
};

const fetchDepartments = async (): Promise<Departments> => {
  let deps = await request<Departments>(
    "https://collectionapi.metmuseum.org/public/collection/v1/departments"
  );
  return deps;
};

export const storeDepartments = async () => {
  if ((await departmentsdb.departments.count()) === 0) {
    let deps = await fetchDepartments();
    deps.departments.map(async (d) => {
      await departmentsdb.departments.add(d);
    });
  }
};

const fetchArtwork = async (id: number): Promise<Artwork> => {
  let url = `https://collectionapi.metmuseum.org/public/collection/v1/objects/${id}`;
  let artwork = await request<Artwork>(url);
  return artwork;
};

export const storeArtworkIDs = async (id: number) => {
  let ids = await fetchArtworkIDs(id);
  await idsDB.ids.clear();
  let a = await idsDB.ids.add(ids);
  return a as number;
};

export const getDBSize = async (dbNumber: number) => {
  let count = await idsDB.ids.get(dbNumber);
  if (count) return count.total;
  else return -1;
};

const N = 6;

export const getCollection = async (
  idx: number,
  dbNumber: number
): Promise<Artwork[]> => {
  let pack: number[] = [];
  let index = idx * N;
  // let ids = await idsDB.ids.get(1);
  let ids = await idsDB.ids.get(dbNumber);
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
