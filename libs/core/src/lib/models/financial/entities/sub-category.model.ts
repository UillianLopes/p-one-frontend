import { CategoryModel } from './category.model';

export interface SubCategoryModel {
  name: string;
  description?: string;
  id?: string;
  category?: CategoryModel;
  color?: string;
}
