import { NamedModel } from '@p-one/core';

import { CategoryModel } from './category.model';

export interface SubCategoryModel extends NamedModel {
  description?: string;
  id?: string;
  category?: CategoryModel;
  color?: string;
}
