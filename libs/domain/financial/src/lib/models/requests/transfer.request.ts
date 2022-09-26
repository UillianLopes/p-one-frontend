interface TransferSubject {
  walletId: string;
  categoryId: string;
  subCategoryId?: string;
}

export interface TransferRequest {
  title: string;
  value: number;
  dueDate: Date;
  origin: TransferSubject;
  destination: TransferSubject;
}
