import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AdminComponent } from './admin.component';

export const routes: Routes = [
  {
    path: '',
    component: AdminComponent,
    title: 'Admin',
    children: [
      {
        path: '',
        redirectTo: 'users',
        pathMatch: 'full',
      },
      {
        path: 'users',
        loadChildren: () =>
          import('@p-one/features/admin/users').then((m) => m.UsersModule),
        title: 'Admin | Users',
      },
      {
        path: 'profiles',
        loadChildren: () =>
          import('@p-one/features/admin/profiles').then(
            (m) => m.ProfilesModule
          ),
        title: 'Admin | Profiles',
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminRoutingModule {}
