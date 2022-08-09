export interface UpdateEntryRequest {
  id: string;
  dueDate: Date;
  currency: string;
  title: string;
  description: string;
  categoryId: string;
  subCategoryId: string;
  value: number;
  barCode: string;
}
