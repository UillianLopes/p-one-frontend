import { CreateEntryRequest } from './create-entry.request';

interface Installment {
  index: number;
  value: number;
  dueDate: Date;
  barCode: string;
}

export interface CreateInstallmentEntriesRequest extends CreateEntryRequest {
  installments: Installment[];
}
