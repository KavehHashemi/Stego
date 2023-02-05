import Dexie, { Table } from 'dexie';

import { IDs } from '../../types';

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