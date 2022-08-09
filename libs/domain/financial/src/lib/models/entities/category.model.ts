import { EEntryType } from '../enums';

export interface CategoryModel {
  name: string;
  description?: string;
  id?: string;
  type?: EEntryType;
  color?: string;
}
