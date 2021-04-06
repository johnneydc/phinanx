import {PhinanxDB} from '../schema';
import {IDBPDatabase, StoreNames} from 'idb';
import {Entry} from './entry';
import {idb as appDb} from '../config';
import {Repository} from '../repository';

let entryIdbInstance: EntryRepository | null = null;

export class EntryRepository extends Repository<Entry, PhinanxDB>{

  constructor(idb: IDBPDatabase<PhinanxDB>) {
    super(idb);
  }

  public static get(): EntryRepository {
    if (entryIdbInstance === null) {
      if (appDb === null) {
        throw new Error('Missing database connection.');
      }

      entryIdbInstance = new EntryRepository(appDb);
    }

    return entryIdbInstance;
  }

  public static dbSetup(db: IDBPDatabase<PhinanxDB>): void {
    const repo = new EntryRepository(db);
    const store = db.createObjectStore(repo.storeName(), {
      keyPath: 'id'
    });

    store.createIndex('by-date', 'date');
    store.createIndex('by-category', 'category');
  }

  protected storeName(): StoreNames<PhinanxDB> {
    return 'entry';
  }

  protected deserialize(obj?: Partial<Entry>): Entry | null {
    if (obj === undefined) {
      return null;
    }

    const entry = new Entry(obj);
    entry.detail = obj.detail;
    entry.id = obj.id || '';
    entry.category = obj.category;
    entry.dateCreated = obj.dateCreated;
    entry.dateModified = obj.dateModified;

    return entry;
  }
}
