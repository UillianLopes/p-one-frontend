import { CategoryModel, EntryType, SubCategoryModel } from '..';

export interface EntryFilter {
  text?: string;
  categories: CategoryModel[];
  subCategories: SubCategoryModel[];
  date: { month: number; year: number };
  type?: EntryType;
  minValue?: number;
  maxValue?: number;
  paymentStatus?: boolean;
}
