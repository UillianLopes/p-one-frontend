export interface WithdrawRequest {
  withdraw: number;
  categoryId: string;
  subCategoryId?: string;
  title: string;
  dueDate: Date;
}
