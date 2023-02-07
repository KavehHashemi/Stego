export type Artwork = {
  objectID: number;
  title: string;
  artistDisplayName: string;
  primaryImageSmall: string;
  ////
  isPublicDomain: boolean;
  primaryImage: string;
  additionalImages: string[];
  department: string;
  objectName: string;
  objectDate: string;
  artistDisplayBio: string;
  artistNationality: string;
  artistBeginDate: string;
  artistEndDate: string;
  artistWikidata_URL: string;
  medium: string;
  dimensions: string;
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
