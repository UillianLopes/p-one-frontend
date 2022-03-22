import { EEntryPaymentStatus, EEntryType } from '../enums';
import { AutocompleteModel } from './autocomplete.model';

export interface EntryModel {
  id: string;
  type: EEntryType;
  recurrences: number;
  value: number;
  fees: number;
  fine: number;
  title: string;
  index: number;
  dueDate: Date;
  description: string;
  category: AutocompleteModel;
  subCategory: AutocompleteModel;
  barCode: string;
  paymentStatus: EEntryPaymentStatus;
}