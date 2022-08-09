import { EEntryType } from '../enums';

interface CreateEntryRequestRecurrence {
  index: number;
  value: number;
  dueDate: Date;
  barCode: string;
}

export interface CreateEntryRequest {
  type: EEntryType;
  title: string;
  description: string;
  categoryId: string;
  subCategoryId?: string;
  recurrences: CreateEntryRequestRecurrence[];
  currency?: string;
  barCode?: string;
  value?: number;
  dueDate?: Date;
}
