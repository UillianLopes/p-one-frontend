import { EEntryOperation } from '../enums';

export interface CreateCategoryRequest {
  description: string;
  name: string;
  operation: EEntryOperation;
  color: string;
}
