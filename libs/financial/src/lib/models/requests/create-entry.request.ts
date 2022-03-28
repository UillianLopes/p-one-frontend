import { EEntryType } from '../enums';

interface CreateEntryRequestRecurrence {
  index: number;
  value: number;
  dueDate: Date;
}

export interface CreateEntryRequest {
  type: EEntryType;
  title: string;
  description: string;
  categoryId: string;
  subCategoryId?: string;
  recurrences: CreateEntryRequestRecurrence[];
}
