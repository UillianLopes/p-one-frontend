import { EEntryType } from '../enums/entry-type.enum';

export interface CategoryModel {
  name: string;
  description?: string;
  id?: string;
  type?: EEntryType;
  color?: string;
}
