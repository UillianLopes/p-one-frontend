import { CategoryModel, SubCategoryModel } from '../entities';
import { EEntryOperation, EEntryPaymentStatus } from '../enums';

export interface EntryFilter {
  text?: string;
  categories: CategoryModel[];
  subCategories: SubCategoryModel[];
  date: { month: number; year: number };
  operation?: EEntryOperation;
  minValue?: number;
  maxValue?: number;
  paymentStatus?: EEntryPaymentStatus;
}
