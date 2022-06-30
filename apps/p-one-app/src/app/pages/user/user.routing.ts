import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { WithoutAuthGuard } from '@p-one/domain/identity';

import { UserComponent } from './user.component';

const routes: Routes = [
  {
    path: '',
    component: UserComponent,
    children: [
      { path: '', redirectTo: 'sign-up', pathMatch: 'full' },
      {
        path: 'sign-in',
        loadChildren: () =>
          import('./pages/sign-in/sign-in.module').then((e) => e.SignInModule),
      },
      {
        path: 'sign-out',
        loadChildren: () =>
          import('./pages/sign-out/sign-out.module').then(
            (e) => e.SignOutModule
          ),
      },
      {
        path: 'sign-up',
        loadChildren: () =>
          import('@p-one/features/admin').then((e) => e.POneSignUpModule),
        canActivate: [WithoutAuthGuard],
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UserRoutingModule {}
