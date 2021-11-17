import { EntryType } from '../enums';

export interface CreateCategoryRequest {
  description: string;
  name: string;
  type: EntryType;
}
