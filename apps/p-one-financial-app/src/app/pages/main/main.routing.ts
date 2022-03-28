import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AuthGuard } from '../../guards/auth.guard';
import { MainComponent } from './main.component';

const routes: Routes = [
  {
    path: '',
    component: MainComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: '',
        redirectTo: 'entries',
        pathMatch: 'full',
      },
      {
        path: 'settings',
        loadChildren: () =>
          import('./pages/settings/settings.module').then(
            (m) => m.SettingsModule
          ),
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
export class MainRoutingModule {}
