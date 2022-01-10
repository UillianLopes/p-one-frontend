import { EEntryType } from '..';

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
