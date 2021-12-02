import { EntryPaymentStatus, EntryType } from '../enums';
import { PaginatedFilter } from '../filters';

export interface EntryFilterRequest extends PaginatedFilter {
  text: string;
  month: number;
  year: number;
  type?: EntryType;
  subCategoryIds?: string[];
  categoryIds?: string[];
  paymentStatus: EntryPaymentStatus;
}
