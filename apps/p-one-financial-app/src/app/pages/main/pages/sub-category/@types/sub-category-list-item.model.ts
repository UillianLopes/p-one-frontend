import { SubCategoryModel } from '@p-one/domain/financial';

export interface SubCategoryListItemModel extends SubCategoryModel {
  isSelected: boolean;
}
