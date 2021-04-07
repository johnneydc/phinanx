import {Model} from '../model';
import {v4} from 'uuid';
import {formatDate, formatNumber} from '@angular/common';

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

  private getVerbForType(): string {
    switch (this.type) {
      case 'in':
        return 'Added';
      case 'out':
        return 'Paid';
      case 'transfer':
        return 'Transferred';
      default:
        return '';
    }
  }

  public toString(): string {
    return `%s ${this.formattedDate()}  \ns.gry |\ns  ${this.getVerbForType()}\ns.ylw ${this.getAmountDisplay()}\ns for ${this.category} from ${this.deductFrom}`;
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
}
