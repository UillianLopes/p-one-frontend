import { CategoryModel } from '.';

export interface SubCategoryModel {
  name: string;
  description?: string;
  id?: string;
  category?: CategoryModel;
  color?: string;
}
