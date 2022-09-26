export interface DepositRequest {
  deposit: number;
  categoryId: string;
  subCategoryId?: string;
  title: string;
  dueDate: Date;
}
