import { CategoryModel, EntryType, SubCategoryModel } from '@p-one/core';

export interface FirstStepFormModel {
  title: string;
  type: EntryType;
  category: CategoryModel;
  subCategory: SubCategoryModel;
}
