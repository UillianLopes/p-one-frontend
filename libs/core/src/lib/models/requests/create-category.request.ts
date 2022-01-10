import { EEntryType } from '../enums';

export interface CreateCategoryRequest {
  description: string;
  name: string;
  type: EEntryType;
}
