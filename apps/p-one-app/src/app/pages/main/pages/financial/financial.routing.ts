import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { FinancialComponent } from './financial.component';

const routes: Routes = [
  {
    path: '',
    component: FinancialComponent,
    children: [
      {
        path: '',
        redirectTo: 'dashboard',
        pathMatch: 'full',
      },
      {
        path: 'entries',
        loadChildren: () =>
          import('./pages/entry/entry.module').then((m) => m.EntryModule),
      },
      {
        path: 'categories',
        loadChildren: () =>
          import('./pages/category/category.module').then(
            (m) => m.CategoryModule
          ),
      },
      {
        path: 'sub-categories',
        loadChildren: () =>
          import('./pages/sub-category/sub-category.module').then(
            (m) => m.SubCategoryModule
          ),
      },
      {
        path: 'wallets',
        loadChildren: () =>
          import('./pages/wallet/wallet.module').then((m) => m.WalletModule),
      },
      {
        path: 'dashboard',
        loadChildren: () =>
          import('./pages/dashboard/dashboard.module').then(
            (m) => m.DashboardModule
          ),
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FinancialRoutingModule {
  constructor() {}
}
