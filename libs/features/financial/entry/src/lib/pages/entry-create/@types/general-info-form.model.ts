import { CategoryModel, EEntryOperation, EEntryRecurrence, EEntryType, SubCategoryModel } from '@p-one/domain/financial';

export interface GeneralInfoFormModel {
  title: string;
  description: string;
  operation: EEntryOperation;
  category: CategoryModel;
  subCategory?: SubCategoryModel;
  currency?: string;
  dueDate?: Date;
  recurrence: EEntryRecurrence;
  barCode: string;
  type: EEntryType;
  value: number;
}
