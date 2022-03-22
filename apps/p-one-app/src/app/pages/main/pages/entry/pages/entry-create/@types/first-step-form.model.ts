import { CategoryModel, EEntryType, SubCategoryModel } from '@p-one/core';

export interface FirstStepFormModel {
  title: string;
  description: string;
  type: EEntryType;
  category: CategoryModel;
  subCategory?: SubCategoryModel;
}
