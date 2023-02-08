export type Artwork = {
  objectID: number;
  title: string;
  artistDisplayName: string;
  primaryImageSmall: string;
  ////
  //artist
  artistNationality: string;
  artistBeginDate: string;
  artistEndDate: string;
  artistDisplayBio: string;
  //artwork
  primaryImage: string;
  objectDate: string;
  medium: string;
  dimensions: string;
  department: string;
  objectName: string;
  ////
  isPublicDomain: boolean;
  additionalImages: string[];
  artistWikidata_URL: string;
  objectWikidata_URL: string;
};
export type IDs = {
  total: number;
  objectIDs: number[];
};

export type Department = {
  departmentId: number;
  displayName: string;
};
export type Departments = {
  departments: Department[];
};
