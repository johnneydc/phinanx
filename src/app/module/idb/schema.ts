import {DBSchema} from 'idb';
import {Entry} from './entry/entry';

export interface PhinanxDB extends DBSchema {
  entry: {
    key: string;
    value: Entry;
    indexes: {
      'by-date': string;
      'by-category': string;
    }
  };
}
