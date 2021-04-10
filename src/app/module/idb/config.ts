import {deleteDB, IDBPDatabase, openDB} from 'idb';
import {EntryRepository} from './entry/entry-repository';
import {PhinanxDB} from './schema';

const databaseName = 'phinanx_db';
const version = 1;
export let idb: IDBPDatabase<PhinanxDB> | null = null;

const upgrade = (db: IDBPDatabase<PhinanxDB>) => {
  EntryRepository.dbSetup(db);
};

export async function dbInit(): Promise<void> {
  idb = await openDB<PhinanxDB>(databaseName, version, { upgrade });
}

export async function getTestDb(): Promise<IDBPDatabase<PhinanxDB>> {
  const testDbName = 'phinanx:test';
  await deleteDB(testDbName);
  const db = await openDB<PhinanxDB>(testDbName, version, { upgrade });

  console.log('natapos naman ako');

  return db;
}

