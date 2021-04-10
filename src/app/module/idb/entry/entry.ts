import {Model} from '../model';
import {v4} from 'uuid';
import {formatDate, formatNumber} from '@angular/common';

export enum EntryType {
  'in', 'out', 'transfer'
}
export type EntryCategory = string | 'uncategorized';

export class Entry extends Model {
  public datePosted: Date;
  public type?: EntryType;
  public deductFrom: string;
  public accountTo: string;
  public amount: number;

  public detail: string;
  public category: EntryCategory;

  constructor({datePosted, amount, type, deductFrom, accountTo, category, detail}: Partial<Entry>) {
    super(v4());
    this.datePosted = datePosted || new Date();
    this.amount = amount || 0;
    this.type = type;
    this.deductFrom = deductFrom || '';
    this.accountTo = accountTo || '';
    this.category = category || 'uncategorized';
    this.detail = detail || '';
  }

  private getVerbForType(): string {
    switch (this.type) {
      case EntryType.in:
        return 'Added';
      case EntryType.out:
        return 'Paid';
      case EntryType.transfer:
        return 'Transferred';
      default:
        return '';
    }
  }

  public toString(): string {
    return `%s ${this.shortId()} \ns.gry |\ns ${this.formattedDate()}  \ns.gry |\ns ${this.getVerbForType()}\ns.ylw ${this.getAmountDisplay()}\ns for ${this.category} from ${this.deductFrom}`;
  }

  private formattedDate(): string {
    if (this.datePosted === undefined) {
      return '';
    }

    return formatDate(this.datePosted, 'shortDate', 'en');
  }

  private getAmountDisplay(): string {
    if (this.amount === undefined) {
      return '';
    }

    return formatNumber(this.amount, 'en', '1.2');
  }

  private shortId(): string {
    return this.id?.split('-').shift() || '';
  }
}
