import { EEntryOperation } from '../enums';


export interface CreateEntryRequest {
  operation: EEntryOperation;
  title: string;
  description: string;
  categoryId: string;
  subCategoryId?: string;
  currency?: string;
  barCode?: string;
  value?: number;
  dueDate?: Date;
}

