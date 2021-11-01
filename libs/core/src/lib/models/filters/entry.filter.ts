import { PaginatedFilter } from './paginated.filter';

export interface EntryFilter extends PaginatedFilter {
  text: string;
  categoryIds: string[];
  subCategoryIds: string[];
}
