interface TransferSubject {
  walletId: string;
  categoryId: string;
  subCategoryId?: string;
}

export interface TransferRequest {
  title: string;
  value: number;
  origin: TransferSubject;
  destination: TransferSubject;
}
