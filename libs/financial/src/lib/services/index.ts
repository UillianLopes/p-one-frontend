import { BankService } from './bank.service';
import { CategoryService } from './category.service';
import { DashboardService } from './dashboard.service';
import { EntryService } from './entry.service';
import { NotificationsService } from './notifications.service';
import { SubCategoryService } from './sub-category.service';
import { WalletService } from './wallet.service';

export * from './entry.service';
export * from './category.service';
export * from './sub-category.service';
export * from './wallet.service';
export * from './bank.service';
export * from './dashboard.service';
export * from './notifications.service';

export const SERVICE_PROVIDERS = [
  BankService,
  CategoryService,
  DashboardService,
  EntryService,
  SubCategoryService,
  WalletService,
  NotificationsService,
];
