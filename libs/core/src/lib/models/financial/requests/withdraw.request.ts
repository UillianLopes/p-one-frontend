export interface WithdrawRequest {
  deposit: number;
  categoryId: string;
  subCategoryId?: string;
  title: string;
}
