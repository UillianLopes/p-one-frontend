import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { MainComponent } from './main.component';

const routes: Routes = [
  {
    path: '',
    component: MainComponent,
    children: [
      {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full',
      },
      {
        path: 'financial',
        loadChildren: () =>
          import('@p-one/features/financial').then((e) => e.FinancialModule),
      },
      {
        path: 'admin',
        loadChildren: () =>
          import('@p-one/features/admin').then((e) => e.AdminModule),
      },
      {
        path: 'home',
        loadChildren: () =>
          import('@p-one/features/home').then((e) => e.HomeModule),
      },
      {
        path: 'settings',
        loadChildren: () =>
          import('@p-one/features/admin/settings').then(
            (m) => m.SettingsModule
          ),
        title: 'Settings',
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MainRoutingModule {}
