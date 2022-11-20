import { CreateCategoryRequest } from './create-category.request';

export interface UpdateCategoryRequest extends CreateCategoryRequest {
  id: string;
}
