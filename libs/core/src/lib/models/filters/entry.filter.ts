import { CategoryModel, EEntryPaymentStatus, EEntryType, SubCategoryModel } from '..';

export interface EntryFilter {
  text?: string;
  categories: CategoryModel[];
  subCategories: SubCategoryModel[];
  date: { month: number; year: number };
  type?: EEntryType;
  minValue?: number;
  maxValue?: number;
  paymentStatus?: EEntryPaymentStatus;
}
