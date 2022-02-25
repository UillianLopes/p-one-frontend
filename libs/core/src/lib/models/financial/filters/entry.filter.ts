import { CategoryModel, SubCategoryModel } from '../entities';
import { EEntryPaymentStatus, EEntryType } from '../enums';


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
