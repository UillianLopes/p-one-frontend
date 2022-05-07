import { CategoryModel, EEntryType, SubCategoryModel } from '@p-one/financial';

export interface FirstStepFormModel {
  title: string;
  description: string;
  type: EEntryType;
  category: CategoryModel;
  subCategory?: SubCategoryModel;
  currency?: string;
}
