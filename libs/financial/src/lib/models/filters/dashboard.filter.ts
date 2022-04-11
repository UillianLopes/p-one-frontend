import { CategoryModel, SubCategoryModel, WalletModel } from '../entities';

export interface DashboardFilter {
  begin: Date;
  end: Date;
  wallets?: WalletModel[];
  categories?: CategoryModel[];
  subCategories?: SubCategoryModel[];
}
