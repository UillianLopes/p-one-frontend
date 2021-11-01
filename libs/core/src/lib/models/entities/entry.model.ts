import { EntryRecurrence } from '../enums/entry-recurrence.enum';
import { EntryType } from '../enums/entry-type.enum';

export interface EntryModel {
  type: EntryType;
  recurrence: EntryRecurrence;
  value: number;
  fees: number;
  fine: number;
  title: string;
  description: string;
  category: string;
  subCategory: string;
}
