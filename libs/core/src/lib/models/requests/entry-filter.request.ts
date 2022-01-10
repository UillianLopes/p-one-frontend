import { EEntryPaymentStatus, EEntryType } from '../enums';
import { PaginatedFilter } from '../filters';

export interface EntryFilterRequest extends PaginatedFilter {
  text: string;
  month: number;
  year: number;
  type?: EEntryType;
  subCategoryIds?: string[];
  categoryIds?: string[];
  paymentStatus: EEntryPaymentStatus;
}
