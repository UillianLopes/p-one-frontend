import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '@p-one/domain/identity';

import { FinancialComponent } from './financial.component';

const routes: Routes = [
  {
    path: '',
    component: FinancialComponent,
    canActivate: [AuthGuard],
    title: 'Financial',
    children: [
      {
        path: '',
        redirectTo: 'entries',
        pathMatch: 'full',
      },

      {
        path: 'entries',
        loadChildren: () =>
          import('@p-one/features/financial/entry').then((m) => m.EntryModule),
      },
      {
        path: 'categories',
        loadChildren: () =>
          import('@p-one/features/financial/category').then(
            (m) => m.CategoryModule
          ),
      },
      {
        path: 'sub-categories',
        loadChildren: () =>
          import('@p-one/features/financial/sub-category').then(
            (m) => m.SubCategoryModule
          ),
      },
      {
        path: 'wallets',
        loadChildren: () =>
          import('@p-one/features/financial/wallet').then(
            (m) => m.WalletModule
          ),
      },
      {
        path: 'dashboard',
        loadChildren: () =>
          import('@p-one/features/financial/dashboard').then(
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
export class MainRoutingModule {}
