import { EntryType } from '..';

interface CreateEntryRequestRecurrence {
  index: number;
  value: number;
  dueDate: Date;
}

export interface CreateEntryRequest {
  type: EntryType;
  title: string;
  description: string;
  categoryId: string;
  subCategoryId?: string;
  recurrences: CreateEntryRequestRecurrence[];
}
