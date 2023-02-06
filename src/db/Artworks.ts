import Dexie, { Table } from 'dexie';

import { Department, IDs } from '../../types';

export class IDsDB extends Dexie {
  ids!: Table<IDs>;
  constructor() {
    super("IDsDB");
    this.version(1).stores({
      ids: "++id",
    });
  }
}

export const idsDB = new IDsDB();

//////////////

export class departmentsDB extends Dexie {
  departments!: Table<Department>;
  constructor() {
    super("departmentsDB");
    this.version(1).stores({
      departments: "++id",
    });
  }
}

export const departmentsdb = new departmentsDB();
