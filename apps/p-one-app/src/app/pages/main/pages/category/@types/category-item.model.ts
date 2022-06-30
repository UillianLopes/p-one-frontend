import { CategoryModel } from '@p-one/domain/financial';

export interface CategoryListItemModel extends CategoryModel {
  isSelected: boolean;
}
