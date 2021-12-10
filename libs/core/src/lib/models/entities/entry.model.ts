import { EntryType } from '../enums/entry-type.enum';
import { AutocompleteModel } from './autocomplete.model';

export interface EntryModel {
  id: string;
  type: EntryType;
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
}
