import { EEntryOperation } from '../enums';

export interface CreateCategoryRequest {
  description: string;
  name: string;
  type: EEntryOperation;
  color: string;
}
