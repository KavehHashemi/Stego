export type Artwork = {
  objectID: number;
  title: string;
  artistDisplayName: string;
  primaryImageSmall: string;
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
