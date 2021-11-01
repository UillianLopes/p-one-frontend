import { PaginatedFilter } from './paginated.filter';

export interface CategoryFilter extends PaginatedFilter {
  text?: string;
}
