import Dexie, { Table } from 'dexie';

import { Department } from '../utils/types';

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
