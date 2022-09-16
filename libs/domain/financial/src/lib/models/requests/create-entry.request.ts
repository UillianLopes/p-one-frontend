import { EEntryOperation } from '../enums';

export interface CreateEntryRequest {
  operation: EEntryOperation;
  title: string;
  description: string;
  categoryId: string;
  subCategoryId?: string;
  walletId?: string;
  currency?: string;
  barCode?: string;
  value?: number;
  dueDate?: Date;

  paid: boolean;
  paidValue?: number;
  fees?: number;
  fine?: number;
}
