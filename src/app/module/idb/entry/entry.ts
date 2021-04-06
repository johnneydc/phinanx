import {Model} from '../model';
import {v4} from 'uuid';

export type EntryType = 'in' | 'out' | 'transfer';
export type EntryCategory = string | 'uncategorized';

export class Entry extends Model {
  public datePosted?: Date;
  public type?: EntryType;
  public deductFrom?: string;
  public accountTo?: string;
  public amount?: number;

  public detail?: string;
  public category?: EntryCategory;

  constructor({datePosted, amount, type, deductFrom, accountTo}: Partial<Entry>) {
    super(v4());
    this.datePosted = datePosted;
    this.amount = amount;
    this.type = type;
    this.deductFrom = deductFrom;
    this.accountTo = accountTo;
    this.category = 'uncategorized';
  }
  public toString(): string {
    throw new Error('Method not implemented.');
  }
}
